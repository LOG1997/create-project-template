import { Injectable } from '@nestjs/common';
import { PrcheckUploadfileDto } from './dto/precheck-uploadfile.dto';
import { CreateUploadfileDto } from './dto/create-updatefile.dto';
import { PrismaService } from 'nestjs-prisma';
import { RedisService } from '../redis/redis.service';
// import { MulterDiskUploadedFiles } from '@nestjs/platform-express';
// import * as path from 'path';

@Injectable()
export class UploadfileService {
    constructor(private readonly prisma: PrismaService,
        private readonly redis: RedisService) { }
    // 文件是否存在
    async hashFile(precheckUploadfileDto: PrcheckUploadfileDto) {
        const { hash, chunkCount } = precheckUploadfileDto;
        // 判断数据库是否存在文件信息
        const uploadfile = await this.prisma.file.findUnique({
            where: {
                hash: hash
            }
        })
        if (uploadfile) {
            return { uploadfile, done: true }
        }
        // 判断redis是否存在文件信息，存在则表明上传未完成，传递上传片数到前端
        const redisFile = await this.redis.hgetAll(hash);
        if (Object.keys(redisFile).length > 0) {
            const { chunkCount, complete } = redisFile;
            return { chunkCount, complete, done: false };
        }
        else {
            await this.redis.hsetnx(hash, 'chunkCount', chunkCount);
            await this.redis.hsetnx(hash, 'complete', 0);
            await this.redis.pexpire(hash, 1000 * 60 * 60 * 24 * 7);
            return { chunkCount, complete: 0, done: false };
        }

    }
    // 上传文件
    async uploadFile(createUploadfileDto: CreateUploadfileDto) {
        // console.log('😏file:', file)
        // console.log('😀createUploadfileDto:', createUploadfileDto)
        return createUploadfileDto;

    }

}
