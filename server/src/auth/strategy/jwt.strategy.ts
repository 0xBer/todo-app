import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		config: ConfigService,
		private prisma: PrismaService,
	) {
		const secretOrKey = config.get<string>('JWT_SECRET');

		if (!secretOrKey) throw new Error('No secret key provided');

		super({
			jwtFromRequest: ExtractJwt.FromAuthHeaderAsBearerToken(),
			secretOrKey,
		});
	}

	async validate(payload: { sub: number; username: string }) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: payload.sub,
			},
		});

		if (!user) throw new Error('No user was found');

		const { password, ...userData } = user;

		return userData;
	}
}
