import { compareSync } from 'bcryptjs';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { Auth } from './entities/auth.entity';
import { PrismaService } from '../shared';
import { HttpException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        private readonly prisma: PrismaService,
    ) {
        super({
            usernameField: 'user',
            passwordField: 'password',
        } as IStrategyOptions);
    }

    async validate(user: string, password: string): Promise<Auth> {
        console.log('😉password:', password)
        console.log('😌user:', user)
        const isEmail = user.indexOf('@') > -1;
        const userInfo = await this.prisma.user.findUnique({
            where: isEmail ? { email: user } : { username: user },
        });
        console.log('😓userInfo:', userInfo)
        if (!userInfo) {
            throw new HttpException('用户名不正确!', 400);
        }
        if (!compareSync(password, userInfo.password)) {
            throw new HttpException('密码不正确!', 400);
        }
        return userInfo;
    }
}