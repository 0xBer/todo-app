import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoDto } from './dto/todo.dto';
import { AuthRequest } from './interface/request.interface';

@Injectable()
export class TodosService {
	constructor(private prisma: PrismaService) {}

	async getAllTodos() {
		return await this.prisma.todo.findMany();
	}

	async getOneTodo(id: number, req: AuthRequest) {
		const todo = await this.prisma.todo.findUnique({
			where: {
				id,
			},
		});

		if (!todo || todo.userId !== req.user.id)
			throw new UnauthorizedException('No todo or unauthorized');

		return todo;
	}

	async createTodo(dto: TodoDto, req: AuthRequest) {
		return await this.prisma.todo.create({
			data: {
				title: dto.title,
				description: dto.description,
				user: {
					connect: {
						id: req.user.id,
					},
				},
				isDone: false,
			},
		});
	}

	async updateTodo(id: number, body: Partial<TodoDto>, req: AuthRequest) {
		const todo = await this.prisma.todo.findUnique({
			where: {
				id,
			},
		});

		if (!todo || todo.userId !== req.user.id)
			throw new UnauthorizedException('Not authorized');

		return await this.prisma.todo.update({
			where: {
				id,
			},
			data: {
				title: body.title,
				description: body.description,
				isDone: body.isDone,
			},
		});
	}

	async deleteTodo(id: number, req: AuthRequest) {
		const todo = await this.prisma.todo.findUnique({
			where: {
				id,
			},
		});

		if (!todo || todo.userId !== req.user.id)
			throw new UnauthorizedException('Not authorized');

		return await this.prisma.todo.delete({
			where: {
				id,
			},
		});
	}
}
