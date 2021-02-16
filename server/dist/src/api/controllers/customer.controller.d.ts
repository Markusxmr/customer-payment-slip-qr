import { CustomerService } from '../../service/services/customer.service';
import { CreateCustomerDto } from '../dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dto/customer/update-customer.dto';
import { PaymentSlipService } from '../../service/services/payment-slip.service';
export declare class CustomerController {
    private readonly customerService;
    private readonly paymentSlipService;
    constructor(customerService: CustomerService, paymentSlipService: PaymentSlipService);
    create(createCustomerDto: CreateCustomerDto): Promise<any>;
    findAll(options: Record<string, unknown>): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<any>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    uploadFile(res: any, file: any): Promise<void>;
}
