import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private config: ConfigService,
	) {}

	async register(dto: AuthDto) {
		try {
			const hash = await argon2.hash(dto.password);

			const user = await this.prisma.user.create({
				data: {
					username: dto.username,
					password: hash,
				},
			});

			return this.signToken(user.id, user.username);
		} catch (error) {
			return { message: error.message };
		}
	}

	async login(dto: AuthDto) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					username: dto.username,
				},
			});

			if (!user) return { message: 'Wrong credentials' };

			const isMatch = await argon2.verify(user.password, dto.password);

			if (isMatch === false) return { message: 'Wrong credentials' };

			return this.signToken(user.id, user.username);
		} catch (error) {
			return { message: error.message };
		}
	}

	async signToken(
		userId: number,
		username: string,
	): Promise<{ access_token: string }> {
		const payload = {
			sub: userId,
			username,
		};
		const secret = this.config.get('JWT_SECRET');

		const token = await this.jwtService.signAsync(payload, {
			expiresIn: '15m',
			secret: secret,
		});

		return {
			access_token: token,
		};
	}
}
