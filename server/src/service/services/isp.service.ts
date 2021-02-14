import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIspDto } from '../../api/dto/isp/create-isp.dto';
import { UpdateIspDto } from '../../api/dto/isp/update-isp.dto';
import { Repository } from 'typeorm';
import { Isp } from '../../entities/isp.entity';

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

  findAll() {
    return this.ispRepository.find();
  }

  findOne(id: number) {
    return this.ispRepository.findOne(id);
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
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.ispRepository.delete(item.id);
  }
}
