import { Injectable } from '@nestjs/common';
import { RedisService } from './shared/common/redis/redis.service';
@Injectable()
export class AppService {
    constructor(private readonly redisService: RedisService) { }
    async getHello() {
        console.log('😁redisService:', this.redisService)
        await this.redisService.set('name', 'zhangsan', 'EX', 200);
        return 'Hello World!';
    }
}
