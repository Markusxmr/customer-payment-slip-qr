import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { IspService } from '../../../services/isp.service';
import { CreateIspDto } from '../dto/isp/create-isp.dto';
import { UpdateIspDto } from '../dto/isp/update-isp.dto';

@Controller('isp')
export class IspController {
  constructor(private readonly ispService: IspService) {}

  @Post()
  create(@Body() createIspDto: CreateIspDto) {
    return this.ispService.create(createIspDto);
  }

  @Get()
  findAll() {
    return this.ispService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ispService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateIspDto: UpdateIspDto) {
    return this.ispService.update(+id, updateIspDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ispService.remove(+id);
  }

  @Post()
  login(@Body() login: any) {
    const currentUsername = 'genex';
    const currentPassword = 'ogulin1808';

    const username = login?.username;
    const password = login?.password;

    return currentUsername === username && currentPassword === password;
  }
}
