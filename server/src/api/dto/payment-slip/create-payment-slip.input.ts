import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePaymentSlipInput {
  @Field(() => Int, { description: 'ISP ID' })
  isp_id: number;

  @Field(() => Int, { description: 'CUSTOMER ID' })
  customer_id: number;
}
