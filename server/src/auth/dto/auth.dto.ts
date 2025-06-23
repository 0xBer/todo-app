import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(15)
	username: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string;
}
