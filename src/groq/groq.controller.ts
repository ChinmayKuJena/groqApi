import { Controller, Get } from '@nestjs/common';
import { GroqService } from './groq.service';

@Controller('groq')
export class GroqController {
    constructor(
        private readonly groqService:GroqService,
    ){}
    @Get()
    async getAllFields(): Promise<String>{
        const chatCompletionResponse = await this.groqService.getChatCompletion1("India")
        return chatCompletionResponse;
    }
}
