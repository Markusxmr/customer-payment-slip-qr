import { IspService } from '../../service/services/isp.service';
import { CreateIspDto } from '../dto/isp/create-isp.dto';
import { UpdateIspDto } from '../dto/isp/update-isp.dto';
export declare class IspController {
    private readonly ispService;
    constructor(ispService: IspService);
    create(createIspDto: CreateIspDto): Promise<import("../../entities/isp.entity").Isp>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateIspDto: UpdateIspDto): Promise<any>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
