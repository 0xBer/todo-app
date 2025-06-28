import { IsBoolean, IsString, MaxLength } from 'class-validator';

export class TodoDto {
	@IsString()
	@MaxLength(20)
	title: string;

	@IsString()
	@MaxLength(100)
	description: string;

	@IsBoolean()
	isDone: boolean;
}
