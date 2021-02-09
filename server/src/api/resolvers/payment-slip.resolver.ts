import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentSlipService } from '../../service/services/payment-slip.service';
import { PaymentSlip } from '../../entities/payment-slip.entity';
import { CreatePaymentSlipInput } from '../dto/payment-slip/create-payment-slip.input';
import { UpdatePaymentSlipInput } from '../dto/payment-slip/update-payment-slip.input';

@Resolver(() => PaymentSlip)
export class PaymentSlipResolver {
  constructor(private readonly paymentSlipService: PaymentSlipService) {}

  @Mutation(() => PaymentSlip)
  createPaymentSlip(
    @Args('createPaymentSlipInput')
    createPaymentSlipInput: CreatePaymentSlipInput,
  ) {
    return this.paymentSlipService.create(createPaymentSlipInput);
  }

  @Query(() => [PaymentSlip], { name: 'user' })
  findAll() {
    return this.paymentSlipService.findAll();
  }

  @Query(() => PaymentSlip, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentSlipService.findOne(id);
  }

  @Mutation(() => PaymentSlip)
  updatePaymentSlip(
    @Args('updatePaymentSlipInput')
    updatePaymentSlipInput: UpdatePaymentSlipInput,
  ) {
    return this.paymentSlipService.update(
      updatePaymentSlipInput.id,
      updatePaymentSlipInput,
    );
  }

  @Mutation(() => PaymentSlip)
  removePaymentSlip(@Args('id', { type: () => Int }) id: number) {
    return this.paymentSlipService.remove(id);
  }
}
