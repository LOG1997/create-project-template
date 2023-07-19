import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './shared/common/prisma/prisma.module';
import { UsrModule } from './modules/usr/usr.module';

import envConfig from '../config/env';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [envConfig.envPath],
        }),
        PrismaModule,
        UsrModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
