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
    const customer = await this.customerRepository.findOne(id);
    if (!customer) throw new NotFoundException();
    let paymentSlips = await getManager().query(
      `
    select * from payment_slips where customer_id = $1 order by id desc`,
      [id],
    );
    paymentSlips = dto(paymentSlips, this.excludes);
    return { ...customer, paymentSlips };

    return this.customerRepository
      .createQueryBuilder('customers')
      .innerJoinAndSelect('customers.paymentSlips', 'paymentSlips')
      .orderBy('paymentSlips.id', 'DESC')
      .where('customers.id = :id', { id })
      .getOne();
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
    let item = await this.customerRepository.findOne(id);
    if (!item) throw new NotFoundException();
    return this.customerRepository.delete(item.id);
  }
}
