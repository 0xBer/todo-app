import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UsersModule,
		PrismaModule,
		AuthModule,
		TodosModule,
	],
	providers: [PrismaService],
})
export class AppModule {}
