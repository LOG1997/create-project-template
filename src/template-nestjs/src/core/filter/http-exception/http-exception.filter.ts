import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
const isProd = process.env.NODE_ENV === 'production';
// http-exception过滤器
@Catch()
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // 获取上下文
        const response = ctx.getResponse(); // 获取响应对象
        const request = ctx.getRequest(); // 获取请求对象
        const status = exception instanceof HttpException ? exception.getStatus() : 500; // 获取状态码
        const exceptionErr = exception instanceof HttpException ? exception : new HttpException('未知错误', status); // 获取错误信息
        let message = exceptionErr.message // 获取错误信息

        console.log('😐exceptionErr.getResponse():', exceptionErr)
        if (typeof exceptionErr.getResponse() === 'object' && exceptionErr.getResponse().hasOwnProperty('message')) {

            message = exceptionErr.getResponse()['message']
        }
        // 区分开发环境，生产环境
        if (isProd) {
            message = status >= 500 ? '服务器错误' : message
        }

        const errMessage = {
            code: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
            data: null,
            success: false
        }

        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errMessage)
    }
}
