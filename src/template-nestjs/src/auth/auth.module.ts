import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy';
import { LoggerModule } from 'src/shared/common/logger/logger.module';

import { RedisModule } from 'src/shared/common/redis/redis.module';

import { AjaxMiddleware } from 'src/ajax/ajax.middleware';
const jwtModule = JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const jet_secret = configService.get('JWT_SECRET', '0819')
        return {
            secret: jet_secret,
            // redis缓存token，过期时间由redis控制
            // signOptions: { expiresIn: '4h' },
        };
    },
});

@Module({
    imports: [PassportModule, jwtModule, LoggerModule, RedisModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [jwtModule, AuthService]
})
export class AuthModule implements NestModule {
    // 中间件
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AjaxMiddleware).forRoutes('*');
    }
}
