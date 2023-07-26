import { Module } from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';
import { RedisModule } from 'src/shared/common/redis/redis.module';
import { UploadfileController } from './uploadfile.controller';
import { MulterModule } from '@nestjs/platform-express';
// import { fileMiddleware } from './middleware/file.middleware';
// import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
    imports: [RedisModule,
        MulterModule.register({
            dest: path.join(__dirname, '../../../upload'),
            // storage: diskStorage({
            //     destination: path.join(__dirname, '../../../upload'),
            //     filename: (req, file, cb) => {
            //         console.log('😅req:', req.body)
            //         console.log('😕file:', file)
            //         // console.log('😄req:', req['multer'])
            //         // console.log('😋fileasdaisidasii:', file)
            //         const fileName = Date.now() + file.originalname.split('.')[0]
            //         return cb(null, fileName);
            //     },
            // })
        }),
    ],
    controllers: [UploadfileController],
    providers: [UploadfileService]
})
// export class UploadfileModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//         consumer.apply(fileMiddleware).forRoutes('*');
//     }
// }
export class UploadfileModule { }