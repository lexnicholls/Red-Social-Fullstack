import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';

const uri =
  'mongodb+srv://lexnicholls:iZk8r5JDyVq2HohP@clusterfullstack.nueflyy.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [UserModule, MongooseModule.forRoot(uri), PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
