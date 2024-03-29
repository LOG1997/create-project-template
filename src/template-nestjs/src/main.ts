import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packageConfig from '../package.json';

import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './shared/common/logger/logger.service';
import { ajaxMiddleware } from './middleware/ajax.middleware';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: false
    });
    //全局的logger
    const logger = app.get(LoggerService);
    app.useLogger(logger);
    const config = new DocumentBuilder()
        .setTitle(packageConfig.name)
        .setDescription(packageConfig.description)
        .setVersion(packageConfig.version)
        .addBearerAuth()
        .addServer('/api')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/swagger', app, document);
    app.setGlobalPrefix('api');
    app.use(ajaxMiddleware); // 使用中间件
    app.useGlobalFilters(new HttpExceptionFilter(logger)); //使用全局过滤器
    app.useGlobalInterceptors(new TransformInterceptor(logger)); //使用全局拦截器
    app.useGlobalPipes(new ValidationPipe()); //使用全局管道
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    await app.listen(3000).then(() => {
        console.log('the swagger doc:' + 'http://localhost:3000/api/swagger')
        console.log('you can get:' + 'http://localhost:3000/api')
    })
}
bootstrap();
