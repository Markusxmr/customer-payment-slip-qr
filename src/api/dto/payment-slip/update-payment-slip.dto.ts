import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentSlipDto } from './create-payment-slip.dto';

export class UpdatePaymentSlipDto extends PartialType(CreatePaymentSlipDto) {}
