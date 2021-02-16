import { PaymentSlip } from './payment-slip.entity';
export declare class Isp {
    id: number;
    name: string;
    street: string;
    postalCode: number;
    city: string;
    oib: number;
    iban: string;
    paymentSlips: PaymentSlip[];
    inserted_at: Date;
    updated_at: Date;
}
