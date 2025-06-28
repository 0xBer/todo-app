import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDto } from './dto/todo.dto';
import { JwtGuard } from 'src/auth/guard';
import { AuthRequest } from './interface/request.interface';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Get()
	getAllTodos() {
		return this.todosService.getAllTodos();
	}

	@Get(':id')
	getOneTodo(@Param('id') id: number, @Req() req: AuthRequest) {
		return this.todosService.getOneTodo(+id, req);
	}

	@Post()
	createTodo(@Body() dto: TodoDto, @Req() req: AuthRequest) {
		return this.todosService.createTodo(dto, req);
	}

	@Patch(':id')
	updateTodo(
		@Param('id') id: number,
		@Body() body: Partial<TodoDto>,
		@Req() req: AuthRequest,
	) {
		return this.todosService.updateTodo(+id, body, req);
	}

	@Delete(':id')
	deleteTodo(@Param('id') id: number, @Req() req: AuthRequest) {
		return this.todosService.deleteTodo(+id, req);
	}
}
