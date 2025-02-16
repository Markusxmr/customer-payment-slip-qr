import { PartialType } from '@nestjs/mapped-types';
import { CreateIspDto } from './create-isp.dto';

export class UpdateIspDto extends PartialType(CreateIspDto) {}
