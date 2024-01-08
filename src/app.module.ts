import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';
import { BucketModule } from './bucket/bucket.module';
// import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    MessageModule,
    BucketModule,
  ],
  controllers: [
    // BucketController,
    // MessageController,
    AppController,
  ],
  providers: [AppService],
})
export class AppModule { }
