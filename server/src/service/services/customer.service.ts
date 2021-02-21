import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from '../../api/dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../../api/dto/customer/update-customer.dto';
import { DeleteResult, getManager, Repository } from 'typeorm';
import { Customer } from '../../entities/customer.entity';
import { dto } from '../helpers/dto';
import { paymentSlipDomain } from '../../domain/payment-slip.domain';
import { Isp } from '../../entities/isp.entity';
import { PaymentSlip } from '../../entities/payment-slip.entity';

@Injectable()
export class CustomerService {
  private relations = ['paymentSlips', 'isp'];
  private excludes = ['inserted_at', 'updated_at', 'deleted_at'];

  constructor(
    @Inject('PAYMENT_SLIP_REPOSITORY')
    private paymentSlipRepository: Repository<PaymentSlip>,
    @Inject('ISP_REPOSITORY')
    private ispRepository: Repository<Isp>,
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    let item = new Customer();
    return this.customerRepository.save({ ...item, ...createCustomerDto });
  }

  createMany(createCustomerDtos: CreateCustomerDto[]) {
    let items = [];
    for (const item of createCustomerDtos) {
      items.push(item);
    }
    return this.customerRepository.save(items);
  }

  async findAll(options?: Record<string, unknown>) {
    const items = await this.customerRepository
      .createQueryBuilder('customers')
      .where('naziv ilike :naziv', { naziv: `%${options?.naziv}%` })
      .orWhere('adresa ilike :adresa', { adresa: `%${options?.adresa}%` })
      .orWhere('mjesto ilike :mjesto', { mjesto: `%${options?.mjesto}%` })
      .orderBy('customers.id', 'DESC')
      .getMany();

    return dto(items, this.excludes);
  }

  async findOne(id: number) {
    const customers = await getManager().query(`select * from customers where id = $1`, [id]);

    let paymentSlips = await getManager().query(`select * from payment_slips where customer_id = $1 order by id desc`, [
      id,
    ]);
    paymentSlips = dto(paymentSlips, this.excludes);

    if (customers.length === 0) {
      throw new NotFoundException();
    }

    return { ...customers[0], paymentSlips };

    return this.customerRepository
      .createQueryBuilder('customers')
      .leftJoinAndSelect('customers.paymentSlips', 'paymentSlips')
      .orderBy('paymentSlips.id', 'DESC')
      .where('customers.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    delete updateCustomerDto?.paymentSlips;
    let customer = await this.customerRepository.save({ ...item, ...updateCustomerDto });
    let paymentSlips = await getManager().query(`select * from payment_slips where customer_id = $1`, [item?.id]);

    let isp;
    for (const paymentSlip of paymentSlips) {
      if (!isp || isp?.id !== paymentSlip?.isp_id) {
        isp = await this.ispRepository.findOne(paymentSlip?.isp_id);
      }
      let updatedPaymentSlip = paymentSlipDomain({ isp, customer }, paymentSlip?.mjesec);
      await this.paymentSlipRepository.update(paymentSlip?.id, updatedPaymentSlip);
    }

    return customer;
  }

  async removeAll() {
    await this.customerRepository.createQueryBuilder('customers').delete().from(Customer).execute();
    return new DeleteResult();
  }

  async remove(id: number) {
    if (!id) throw new NotFoundException('Id not provided');
    let item = await this.customerRepository.findOne(id);
    if (!item) throw new NotFoundException();
    return this.customerRepository.delete(item.id);
  }
}
