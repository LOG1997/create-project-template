import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { LoggerService } from 'src/shared/common/logger/logger.service';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(
            map(data => {
                this.logger.info('TransformInterceptor', data.data);
                return {
                    data,
                    code: 10000,
                    message: '请求成功',
                    success: true
                }
            })
        )
    }
}
