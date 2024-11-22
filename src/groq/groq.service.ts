import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { groqConfig } from '../config/groq.config';

@Injectable()
export class GroqService {
    private groq;

    constructor() {
      this.groq = new Groq({ apiKey: groqConfig.apiKey });
    }
  
    async getChatCompletion(message: string) {
      const chatCompletion = await this.groq.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'llama3-8b-8192',
      });
      return chatCompletion.choices[0]?.message?.content || '';
    }
    async getChatCompletionUsage(message: string) {
      const chatCompletion = await this.groq.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'llama3-8b-8192',
      });
      return chatCompletion.usage;
    }

}
