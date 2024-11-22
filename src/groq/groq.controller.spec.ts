import { Test, TestingModule } from '@nestjs/testing';
import { GroqController } from './groq.controller';

describe('GroqController', () => {
  let controller: GroqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroqController],
    }).compile();

    controller = module.get<GroqController>(GroqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
