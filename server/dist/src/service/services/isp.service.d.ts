import { CreateIspDto } from '../../api/dto/isp/create-isp.dto';
import { UpdateIspDto } from '../../api/dto/isp/update-isp.dto';
import { Repository } from 'typeorm';
import { Isp } from '../../entities/isp.entity';
export declare class IspService {
    private ispRepository;
    constructor(ispRepository: Repository<Isp>);
    create(createIspDto: CreateIspDto): Promise<Isp>;
    createMany(createIspDtos: CreateIspDto[]): Promise<import("typeorm").InsertResult>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<Isp>;
    findOneDefault(): Promise<Isp>;
    update(id: number, updateIspDto: UpdateIspDto): Promise<{
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
    } & Isp>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
