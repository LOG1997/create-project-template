import { Injectable, Inject } from '@nestjs/common';
import * as Redis from 'ioredis';
@Injectable()
export class RedisService {
    constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis) { }
    async get(key: string): Promise<string | null> {
        return await this.redisClient.get(key);
    }
    // ex and time is not required
    async set(key: string, value: string, secondsToken?: 'EX', seconds?: number): Promise<void> {
        if (secondsToken && seconds) {
            await this.redisClient.set(key, value, 'EX', seconds);
        } else {
            await this.redisClient.set(key, value);
        }
    }
    async hget(key: string, field: string): Promise<string | null> {
        return await this.redisClient.hget(key, field);
    }
    async hgetAll(key: string): Promise<{ [key: string]: string }> {
        return await this.redisClient.hgetall(key);
    }
    async hsetnx(key: string, field: string, value: number | string): Promise<void> {
        await this.redisClient.hsetnx(key, field, value);
    }
    async pexpire(key: string, milliseconds: number): Promise<void> {
        await this.redisClient.pexpire(key, milliseconds);
    }
    async del(key: string): Promise<void> {
        await this.redisClient.del(key);
    }
}
