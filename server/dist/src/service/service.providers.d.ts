import { Connection, Repository } from 'typeorm';
import { Isp } from '../entities/isp.entity';
import { Customer } from '../entities/customer.entity';
import { PaymentSlip } from '../entities/payment-slip.entity';
export declare const serviceProviders: ({
    provide: string;
    useFactory: (connection: Connection) => Repository<PaymentSlip>;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => Repository<Customer>;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => Repository<Isp>;
    inject: string[];
})[];
