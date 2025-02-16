import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIspDto } from '../modules/api/dto/isp/create-isp.dto';
import { UpdateIspDto } from '../modules/api/dto/isp/update-isp.dto';
import { Repository } from 'typeorm';
import { Isp } from '../entities/isp.entity';
import { dto } from '../common/utils/dto.util';
import { AppDataSource } from '../modules/database/database.providers';

@Injectable()
export class IspService {
  constructor(
    @Inject('ISP_REPOSITORY')
    private ispRepository: Repository<Isp>,
  ) {}

  create(createIspDto: CreateIspDto) {
    let item = new Isp();
    item = { ...item, ...createIspDto };
    return this.ispRepository.save(item);
  }

  createMany(createIspDtos: CreateIspDto[]) {
    let items = [];
    for (const item of createIspDtos) {
      items.push(item);
    }
    return this.ispRepository.insert(items);
  }

  async findAll() {
    const items = await AppDataSource.query(`select * from isps order by id desc`);
    return dto(items, ['inserted_at', 'updated_at']);
  }

  async findOne(id: number) {
    const item = await this.ispRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    return item;
  }

  async findOneDefault() {
    let item = await this.ispRepository.findOne({ where: { defaultIsp: true } });

    if (!item) {
      const items = await this.findAll();
      item = items[0];
      if (!item) throw new NotFoundException('ISP not found');
    }
    return item;
  }

  async update(id: number, updateIspDto: UpdateIspDto) {
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.ispRepository.save({
      ...item,
      ...updateIspDto,
    });
  }

  async remove(id: number) {
    if (!id) throw new NotFoundException('Id not provided');
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.ispRepository.delete(item.id);
  }
}
