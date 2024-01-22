import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

const uri = "mongodb+srv://lexnicholls:iZk8r5JDyVq2HohP@clusterfullstack.nueflyy.mongodb.net/?retryWrites=true&w=majority";

@Module({
  imports: [UsersModule, MongooseModule.forRoot(uri)],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
