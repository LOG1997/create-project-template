import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy';
import { LoggerModule } from 'src/shared/common/logger/logger.module';

const jwtModule = JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const jet_secret = configService.get('JWT_SECRET', '0819')
        return {
            secret: jet_secret,
            signOptions: { expiresIn: '4h' },
        };
    },
});

@Module({
    imports: [PassportModule, jwtModule, LoggerModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [jwtModule, AuthService]
})
export class AuthModule { }
