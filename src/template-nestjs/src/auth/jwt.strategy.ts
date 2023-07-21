import { AuthService } from './auth.service';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config'
import { Auth } from './entities/auth.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET', '0819')
        }
        )
    }
    async validate(user: any) {
        const exitsUser = await this.authService.findOne(user.id);
        if (!exitsUser) {
            throw new HttpException('用户不存在', 200)
        }
        return new Auth(exitsUser)
    }

}