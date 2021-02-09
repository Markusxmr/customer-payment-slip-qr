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
import { UserService } from '../../service/services/user.service';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentSlipService } from '../../service/services/payment-slip.service';
import { setPaymentSlip } from 'src/common/set-payment-slip';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly paymentSlipService: PaymentSlipService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    const items = new Array(12);
    for (const item of items) {
      await this.paymentSlipService.create(setPaymentSlip(user));
    }
  }

  @Get()
  findAll(@Query() options: Record<string, unknown>) {
    return this.userService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete()
  removeAll() {
    return this.userService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('xls')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Response() res, @UploadedFile() file) {
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
    let users = JSON.parse(source);

    if (Array.isArray(users)) {
      users = users.map((item) => {
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
        const userInstances = await this.userService.createMany(users);
        for (const userInstance of userInstances) {
          const items = new Array(12).fill(setPaymentSlip(userInstance));
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
