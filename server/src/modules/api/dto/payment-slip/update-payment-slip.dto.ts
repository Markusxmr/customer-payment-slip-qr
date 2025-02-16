import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentSlipDto } from './create-payment-slip.dto';

export class UpdatePaymentSlipDto extends PartialType(CreatePaymentSlipDto) {
  poziv_na_broj_primatelja: string;
}
