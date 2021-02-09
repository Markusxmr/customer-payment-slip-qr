import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSlipResolver } from './payment-slip.resolver';
import { PaymentSlipService } from '../../service/services/payment-slip.service';

describe('PaymentSlipResolver', () => {
  let resolver: PaymentSlipResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentSlipResolver, PaymentSlipService],
    }).compile();

    resolver = module.get<PaymentSlipResolver>(PaymentSlipResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
