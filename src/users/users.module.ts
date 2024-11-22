// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
// import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { EmailModule } from 'src/email/email.module';
import { GroqModule } from 'src/groq/groq.module';

@Module({
  imports: [
    DatabaseModule,
    // TypeOrmModule.forFeature([User]), // Registers the User entity
    EmailModule,
    GroqModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}

