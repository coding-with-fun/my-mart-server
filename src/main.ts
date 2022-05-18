// https://github.com/dashsaurabh/nestjs-authentication-demo/blob/jwt-authentication/src/app.controller.ts

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    useContainer(app.select(AppModule), {
        fallbackOnErrors: true,
        fallback: true,
    });

    await app.listen(process.env.serverPort);
}

bootstrap();
