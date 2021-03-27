import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIspDto } from '../../api/dto/isp/create-isp.dto';
import { UpdateIspDto } from '../../api/dto/isp/update-isp.dto';
import { getManager, Repository } from 'typeorm';
import { Isp } from '../../entities/isp.entity';
import { dto } from '../helpers/dto';

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
    const items = await getManager().query(`select * from isps order by id desc`);
    return dto(items, ['inserted_at', 'updated_at']);
  }

  async findOne(id: number) {
    const item = await this.ispRepository.findOne(id);
    if (!item) throw new NotFoundException();
    return item;
  }

  async findOneDefault() {
    const item = await this.ispRepository.findOne({ where: { defaultIsp: true } });
    if (!item) throw new NotFoundException();
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
