import { Module } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: (configService: ConfigService) => {
                console.log('😔configService:', configService.get('REDIS_PORT'))
                console.log(configService.get('REDIS_HOST', 'localhost'))
                // console.log(configService.get('REDIS_PORT', 6379))
                return new Redis({
                    // host: 'localhost',
                    // port: 6379,
                    host: configService.get('REDIS_HOST', 'localhost'),
                    port: configService.get('REDIS_PORT', 6379),
                    // password: configService.get('REDIS_PASSWORD', ''),
                });
            },
            inject: [ConfigService],
        },
        RedisService,
    ],
    exports: [RedisService],
})
export class RedisModule { }