import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AjaxMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // NOTE:这里实现了一个简单的中间件，可以进行一些处理
        console.log('经过中间件');
        next();
    }
}
