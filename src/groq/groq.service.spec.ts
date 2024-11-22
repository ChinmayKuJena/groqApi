import { Test, TestingModule } from '@nestjs/testing';
import { GroqService } from './groq.service';

describe('GroqService', () => {
  let service: GroqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroqService],
    }).compile();

    service = module.get<GroqService>(GroqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
