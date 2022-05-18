import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import Product from 'src/models/product.model';
import User from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Product])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export default class UserModule {}
