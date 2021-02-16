import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from '../../api/dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../../api/dto/customer/update-customer.dto';
import { DeleteResult, getManager, Repository } from 'typeorm';
import { Customer } from '../../entities/customer.entity';
import { dto } from '../helpers/dto';

@Injectable()
export class CustomerService {
  private relations = ['paymentSlips'];
  private excludes = ['inserted_at', 'updated_at'];

  constructor(
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
    const customer = await getManager().query(
      `select * from customers where id = $1`,
      [id],
    );

    let paymentSlips = await getManager().query(
      `select * from payment_slips where customer_id = $1 order by id desc`,
      [id],
    );
    paymentSlips = dto(paymentSlips, this.excludes);

    if (customer.length === 0) {
      throw new NotFoundException();
    }

    return { ...customer[0], paymentSlips };

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
    return this.customerRepository.save({ ...item, ...updateCustomerDto });
  }

  async removeAll() {
    await this.customerRepository
      .createQueryBuilder('customers')
      .delete()
      .from(Customer)
      .execute();
    return new DeleteResult();
  }

  async remove(id: number) {
    let item = await this.customerRepository.findOne(id);
    if (!item) throw new NotFoundException();
    return this.customerRepository.delete(item.id);
  }
}
