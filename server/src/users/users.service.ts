import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findOne(id: number) {
		return await this.prisma.user.findUnique({
			where: {
				id,
			},
			omit: {
				password: true,
			},
		});
	}

	async findAll() {
		return await this.prisma.user.findMany({
			omit: {
				password: true,
			},
		});
	}
}
