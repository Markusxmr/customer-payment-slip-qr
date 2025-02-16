import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field(() => Int)
  obveza: number | string;
  @Field(() => Int)
  cijena_opreme: number | string;
}
