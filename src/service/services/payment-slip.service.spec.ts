import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSlipService } from './payment-slip.service';

describe('PaymentSlipService', () => {
  let service: PaymentSlipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentSlipService],
    }).compile();

    service = module.get<PaymentSlipService>(PaymentSlipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
