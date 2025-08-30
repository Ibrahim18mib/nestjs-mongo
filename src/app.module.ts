import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-mongodb-tut'),
    UserModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
