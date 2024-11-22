import { Controller, Get, Param } from '@nestjs/common';
import { GroqService } from './groq.service';

@Controller('groq')
export class GroqController {
    constructor(
        private readonly groqService:GroqService,
    ){}
    @Get('usage')
    async getAllFields(): Promise<String>{
        const chatCompletionResponse = await this.groqService.getChatCompletionUsage("India")
        return chatCompletionResponse;
    }
    @Get('ask/:request')
    async askGroq(@Param('request') request:string): Promise<String>{
        const chatCompletionResponse = await this.groqService.getChatCompletion(request)
        return chatCompletionResponse;
    }
}
