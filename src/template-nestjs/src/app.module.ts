import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './shared/common/prisma/prisma.module';
import { UsrModule } from './modules/usr/usr.module';
import { ArticalModule } from './modules/artical/artical.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './global/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import envConfig from '../config/env';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [envConfig.envPath],
        }),
        PrismaModule,
        UsrModule,
        ArticalModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    }],
})
export class AppModule { }
