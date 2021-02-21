import { IspService } from '../../service/services/isp.service';
import { CreateIspDto } from '../dto/isp/create-isp.dto';
import { UpdateIspDto } from '../dto/isp/update-isp.dto';
export declare class IspController {
    private readonly ispService;
    constructor(ispService: IspService);
    create(createIspDto: CreateIspDto): Promise<import("../../entities/isp.entity").Isp>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<import("../../entities/isp.entity").Isp>;
    update(id: string, updateIspDto: UpdateIspDto): Promise<{
        id: number;
        name: string;
        street: string;
        postalCode: number;
        city: string;
        oib: number;
        iban: string;
        defaultIsp: boolean;
        paymentSlips: import("../../entities/payment-slip.entity").PaymentSlip[];
        inserted_at: Date;
        updated_at: Date;
    } & import("../../entities/isp.entity").Isp>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
