import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { GlobalSettingService } from '../../service/services/global-setting.service';
import { CreateGlobalSettingDto } from '../dto/global-setting/create-global-setting.dto';
import { UpdateGlobalSettingDto } from '../dto/global-setting/update-global-setting.dto';

@Controller('global-setting')
export class GlobalSettingController {
  constructor(private readonly globalSettingService: GlobalSettingService) {}

  @Post()
  create(@Body() createGlobalSettingDto: CreateGlobalSettingDto) {
    return this.globalSettingService.create(createGlobalSettingDto);
  }

  @Get()
  findAll() {
    return this.globalSettingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalSettingService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGlobalSettingDto: UpdateGlobalSettingDto) {
    return this.globalSettingService.update(+id, updateGlobalSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalSettingService.remove(+id);
  }
}
