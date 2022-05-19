import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import IndexModule from './modules/index.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.dbHost,
            port: 3306,
            username: process.env.dbUserName,
            password: process.env.dbPassword,
            database: process.env.databaseName,
            synchronize: true,
            autoLoadEntities: true,
            logging: true,
            logger: 'advanced-console',
        }),
        IndexModule,
    ],
})
export class AppModule {}
