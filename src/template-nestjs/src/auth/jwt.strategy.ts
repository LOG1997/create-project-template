import { AuthService } from './auth.service';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config'
import { Auth } from './entities/auth.entity';
import { RedisService } from 'src/shared/common/redis/redis.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
        private readonly redisService: RedisService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET', '0819'),
            passReqToCallback: true,
        }
        )
    }
    async validate(req, user: any) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const redisToken = await this.redisService.get(`${user.id} & ${user.username}`)
        // NOTE:redis是否使用
        const isRedis = this.configService.get('REDIS_HOST')
        if (isRedis && !redisToken) {
            throw new HttpException('token不正确', 200)
        }
        if (isRedis && redisToken !== token) {
            throw new HttpException('token不正确', 200)
        }
        const exitsUser = await this.authService.findOne(user.id);
        if (!exitsUser) {
            throw new HttpException('用户不存在', 200)
        }
        isRedis ? this.redisService.set(`${user.id} & ${user.username}`, token, 'EX', 2 * 60 * 60) : null
        return new Auth(exitsUser)
    }

}