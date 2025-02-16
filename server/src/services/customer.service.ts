import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from '../modules/api/dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../modules/api/dto/customer/update-customer.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { dto } from '../common/utils/dto.util';
import { paymentSlipDomain } from '../domain/payment-slip.domain';
import { PaymentSlip } from '../entities/payment-slip.entity';
import { AppDataSource } from '../modules/database/database.providers';

@Injectable()
export class CustomerService {
  private relations = ['paymentSlips', 'isp'];
  private excludes = ['inserted_at', 'updated_at', 'deleted_at'];

  constructor(
    @Inject('PAYMENT_SLIP_REPOSITORY')
    private paymentSlipRepository: Repository<PaymentSlip>,
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
      .where('naziv like :naziv', { naziv: `%${options?.naziv}%` })
      .orWhere('adresa like :adresa', { adresa: `%${options?.adresa}%` })
      .orWhere('mjesto like :mjesto', { mjesto: `%${options?.mjesto}%` })
      .orderBy('customers.id', 'DESC')
      .getMany();

    return dto(items, this.excludes);
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) throw new NotFoundException();
    let paymentSlips = await AppDataSource.query(
      `
      select * from payment_slips
      where customer_id = $1
      order by id asc`,
      [id],
    );

    paymentSlips = dto(paymentSlips, this.excludes);
    return { ...customer, paymentSlips };
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    let customer = await this.findOne(id);
    if (!customer) throw new NotFoundException();
    customer = await this.customerRepository.save({ ...customer, ...updateCustomerDto });
    let paymentSlips = await this.paymentSlipRepository
      .createQueryBuilder('payment_slips')
      .innerJoinAndSelect('payment_slips.isp', 'isp')
      .where('payment_slips.customer_id = :customerId', { customerId: id })
      .getMany();

    for (const paymentSlip of paymentSlips) {
      let updatedPaymentSlip = paymentSlipDomain({ isp: paymentSlip.isp, customer }, paymentSlip?.mjesec);
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
    let item = await this.customerRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    return this.customerRepository.delete(item.id);
  }
}
