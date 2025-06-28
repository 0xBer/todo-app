import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.usersService.findOne(+id);
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}
}
