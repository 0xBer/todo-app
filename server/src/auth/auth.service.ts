import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async register(dto: AuthDto) {
		try {
			const hash = await argon2.hash(dto.password);
			const user = await this.prisma.user.create({
				data: {
					username: dto.username,
					password: hash,
				},
			});

			return { user };
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

			return { user };
		} catch (error) {
			return { message: error.message };
		}
	}
}
