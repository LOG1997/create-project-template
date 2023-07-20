import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packageConfig from '../package.json';

import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
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

    app.useGlobalFilters(new HttpExceptionFilter()); //使用全局过滤器
    app.useGlobalInterceptors(new TransformInterceptor()); //使用全局拦截器
    app.useGlobalPipes(new ValidationPipe()); //使用全局管道
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    await app.listen(3000).then(() => {
        console.log('the swagger doc:' + 'http://localhost:3000/api/swagger')
        console.log('you can get:' + 'http://localhost:3000/api')
    })
}
bootstrap();
