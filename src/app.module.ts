import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Users/users.module';
import { PostModule } from './Posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-mongodb-tut'),
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
