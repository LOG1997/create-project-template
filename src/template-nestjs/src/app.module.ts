import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

// import { PrismaModule } from './shared/common/prisma/prisma.module';
import { PrismaModule } from 'nestjs-prisma';
import { ArticalModule } from './modules/artical/artical.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './global/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import envConfig from '../config/env';
import { RedisModule } from 'src/shared/common/redis/redis.module';
import { UploadfileModule } from './shared/common/uploadfile/uploadfile.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [envConfig.envPath],
        }),
        PrismaModule.forRootAsync({
            isGlobal: true,
            useFactory: async (configService: ConfigService) => {
                return {
                    prismaOptions: {
                        // log: [configService.get('log')],
                        datasources: {
                            db: {
                                url: 'mysql://' + configService.get('DB_USER') + ':' + configService.get('DB_PASSWORD') + '@' + configService.get('DB_HOST') + ':' + configService.get('DB_PORT') + '/' + configService.get('DB_DATABASE'),
                            },
                        },
                    },
                    // explicitConnect: configService.get('explicit'),
                };
            },
            inject: [ConfigService],
        }),

        ArticalModule,
        AuthModule,
        RedisModule,
        UploadfileModule,
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    }
    ],
})
export class AppModule { }
