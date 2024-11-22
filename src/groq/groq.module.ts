import { Module } from '@nestjs/common';
import { GroqService } from './groq.service';
import { GroqController } from './groq.controller';

@Module({
  providers: [GroqService],
  exports:[GroqService],
  controllers: [GroqController]
})
export class GroqModule {}
