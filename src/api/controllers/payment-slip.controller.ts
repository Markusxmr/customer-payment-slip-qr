import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { PaymentSlipService } from '../../service/services/payment-slip.service';
import { CreatePaymentSlipDto } from '../dto/payment-slip/create-payment-slip.dto';
import { UpdatePaymentSlipDto } from '../dto/payment-slip/update-payment-slip.dto';
import { getFilesFromDir } from '../../common/load-files';

@Controller('payment-slip')
export class PaymentSlipController {
  constructor(private readonly paymentSlipService: PaymentSlipService) {}

  @Get('/files')
  findFiles() {
    const dir = join(process.cwd(), 'files');
    let files = getFilesFromDir(dir, '.pdf');
    console.log(files);

    return files;
    let data = {};

    function readFiles(dirname, onFileContent, onError) {
      fs.readdir(dirname, function (err, filenames) {
        if (err) {
          onError(err);
          return;
        }
        filenames.forEach(function (filename) {
          fs.readFile(dirname + filename, 'utf-8', function (err, content) {
            if (err) {
              onError(err);
              return;
            }
            onFileContent(filename, content);
          });
        });
      });

      return data;
    }

    return readFiles(
      dir,
      function (filename, content) {
        data[filename] = content;
      },
      function (err) {
        throw err;
      },
    );
  }

  @Post()
  create(@Body() createPaymentSlipDto: CreatePaymentSlipDto) {
    return this.paymentSlipService.create(createPaymentSlipDto);
  }

  @Get()
  findAll() {
    return this.paymentSlipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentSlipService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentSlipDto: UpdatePaymentSlipDto,
  ) {
    return this.paymentSlipService.update(+id, updatePaymentSlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentSlipService.remove(+id);
  }
}
