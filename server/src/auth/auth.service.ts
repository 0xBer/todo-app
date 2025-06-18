import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async register(dto: AuthDto) {
		try {
			const user = await this.prisma.user.create({
				data: {
					username: dto.username,
					password: dto.password,
				},
			});

			return { user };
		} catch (error) {
			return { message: error };
		}
	}

	async login(dto: AuthDto) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					username: dto.username,
				},
			});

			return { user };
		} catch (error) {
			return { message: error.message };
		}
	}
}
