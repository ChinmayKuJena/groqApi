import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { GroqModule } from './groq/groq.module';
import { UserService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UserController } from './users/users.controller';
import { EmailService } from './email/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', }),
    DatabaseModule, EmailModule, GroqModule, 
    UsersModule
  ],
  controllers: [
    AppController,
    // UserController
  ],
  providers: [
    AppService,
     UserService,
     EmailService
  ],
})
export class AppModule {}
