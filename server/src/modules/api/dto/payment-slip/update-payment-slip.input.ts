import { CreatePaymentSlipInput } from './create-payment-slip.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentSlipInput extends PartialType(CreatePaymentSlipInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  poziv_na_broj_primatelja: string;

  @Field(() => Number)
  iznos: number;
}
