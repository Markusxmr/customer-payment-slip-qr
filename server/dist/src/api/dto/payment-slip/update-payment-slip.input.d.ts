import { CreatePaymentSlipInput } from './create-payment-slip.input';
declare const UpdatePaymentSlipInput_base: import("@nestjs/common").Type<Partial<CreatePaymentSlipInput>>;
export declare class UpdatePaymentSlipInput extends UpdatePaymentSlipInput_base {
    id: number;
    poziv_na_broj_primatelja: string;
    iznos: string;
}
export {};
