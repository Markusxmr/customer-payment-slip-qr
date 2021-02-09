import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSlipController } from './payment-slip.controller';
import { PaymentSlipService } from '../../service/services/payment-slip.service';

describe('PaymentSlipController', () => {
  let controller: PaymentSlipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentSlipController],
      providers: [PaymentSlipService],
    }).compile();

    controller = module.get<PaymentSlipController>(PaymentSlipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
