import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGlobalSettingDto } from '../../api/dto/global-setting/create-global-setting.dto';
import { UpdateGlobalSettingDto } from '../../api/dto/global-setting/update-global-setting.dto';
import { getManager, Repository } from 'typeorm';
import { GlobalSetting } from '../../entities/global-setting.entity';
import { dto } from '../helpers/dto';

@Injectable()
export class GlobalSettingService {
  constructor(
    @Inject('GLOBAL_SETTING_REPOSITORY')
    private globalSettingRepository: Repository<GlobalSetting>,
  ) {}

  create(createGlobalSettingDto: CreateGlobalSettingDto) {
    let item = new GlobalSetting();
    item = { ...item, ...createGlobalSettingDto };
    return this.globalSettingRepository.save(item);
  }

  async findAll() {
    const items = await this.globalSettingRepository.find();
    return items;
  }

  async findOne(id: number) {
    let items = await this.findAll();
    let item = await this.globalSettingRepository.findOne(id);
    if (items.length === 0) {
      item = await this.create({ paymentSlipPrintScale: 1.0 });
    }
    return item;
  }

  async update(id: number, updateGlobalSettingDto: UpdateGlobalSettingDto) {
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.globalSettingRepository.save({
      ...item,
      ...updateGlobalSettingDto,
    });
  }

  async remove(id: number) {
    if (!id) throw new NotFoundException('Id not provided');
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.globalSettingRepository.delete(item.id);
  }
}
