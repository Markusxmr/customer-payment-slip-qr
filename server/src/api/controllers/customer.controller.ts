import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Response,
  Query,
} from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import * as xls_json from 'xls-to-json';
import { CustomerService } from '../../service/services/customer.service';
import { CreateCustomerDto } from '../dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dto/customer/update-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentSlipService } from '../../service/services/payment-slip.service';
import { setPaymentSlip } from 'src/common/set-payment-slip';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly paymentSlipService: PaymentSlipService,
  ) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const isp = { isp_id: 1 };
    const customer = await this.customerService.create(createCustomerDto);

    const items = new Array(12);
    for (const item of items) {
      await this.paymentSlipService.create(setPaymentSlip({ isp, customer }));
    }

    return this.customerService.findOne(customer?.id);
  }

  @Get()
  findAll(@Query() options: Record<string, unknown>) {
    return this.customerService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete()
  removeAll() {
    return this.customerService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  @Post('xls')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Response() res, @UploadedFile() file) {
    const isp = { isp_id: 1 };
    const filePath = join(process.cwd(), 'files', file.originalname);
    const jsonPath = filePath.replace('xlsx', 'json').replace('xls', 'json');
    fs.writeFileSync(filePath, file.buffer, {});

    xls_json(
      {
        input: filePath, // input xls
        output: jsonPath, // output json
        sheet: 'Sheet', // specific sheetname
        // rowsToSkip: 5, // number of rows to skip at the top of the sheet; defaults to 0
        allowEmptyKey: false, // avoids empty keys in the output, example: {"": "something"}; default: true
      },
      function (err, results) {
        if (err) console.error(err);
        else
          return results.map((item) => {
            return Object.keys(item).reduce((acc, key) => {
              return {
                ...acc,
                [key.toLowerCase().replace(' ', '_')]: item[key],
              };
            }, {});
          });
      },
    );

    let source: any = fs.readFileSync(jsonPath);
    let customers = JSON.parse(source);

    if (Array.isArray(customers)) {
      customers = customers.map((item) => {
        return Object.keys(item).reduce((acc, key) => {
          return item[key]
            ? {
                ...acc,
                [key.toLowerCase().replace(' ', '_')]: item[key],
              }
            : acc;
        }, {});
      });

      try {
        const customerInstances = await this.customerService.createMany(
          customers,
        );
        for (const customer of customerInstances) {
          const items = new Array(12).fill(setPaymentSlip({ isp, customer }));
          await this.paymentSlipService.createMany(items);
        }
      } catch (error) {
        console.log(error);
      }
    }

    res.send({
      ok: 'ok',
    });
  }
}
