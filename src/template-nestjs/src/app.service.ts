import { Injectable } from '@nestjs/common';
import { RedisService } from './shared/common/redis/redis.service';
@Injectable()
export class AppService {
    constructor(private readonly redisService: RedisService) { }
    async getHello() {
        return 'Hello World!';
    }
}
