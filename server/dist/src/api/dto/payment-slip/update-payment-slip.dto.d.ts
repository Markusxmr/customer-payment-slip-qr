import { CreatePaymentSlipDto } from './create-payment-slip.dto';
declare const UpdatePaymentSlipDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePaymentSlipDto>>;
export declare class UpdatePaymentSlipDto extends UpdatePaymentSlipDto_base {
    poziv_na_broj_primatelja: string;
}
export {};
