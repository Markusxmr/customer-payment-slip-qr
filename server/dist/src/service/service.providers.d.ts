import { Connection } from 'typeorm';
import { Isp } from '../entities/isp.entity';
import { Customer } from '../entities/customer.entity';
import { PaymentSlip } from '../entities/payment-slip.entity';
import { GlobalSetting } from '../entities/global-setting.entity';
export declare const serviceProviders: ({
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<PaymentSlip>;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Customer>;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Isp>;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<GlobalSetting>;
    inject: string[];
})[];
