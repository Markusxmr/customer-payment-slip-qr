import { Test, TestingModule } from '@nestjs/testing';
import { IspController } from './isp.controller';
import { IspService } from '../../../services/isp.service';

describe('IspController', () => {
  let controller: IspController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IspController],
      providers: [IspService],
    }).compile();

    controller = module.get<IspController>(IspController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
