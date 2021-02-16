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
    findOne(id: number): Promise<any>;
    update(id: number, updateIspDto: UpdateIspDto): Promise<any>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
