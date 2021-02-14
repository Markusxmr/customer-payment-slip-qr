import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from '../../api/dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../../api/dto/customer/update-customer.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Customer } from '../../entities/customer.entity';

@Injectable()
export class CustomerService {
  private relations = ['paymentSlips'];

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

  findAll(options?: Record<string, unknown>) {
    return this.customerRepository
      .createQueryBuilder('customers')
      .leftJoinAndSelect('customers.paymentSlips', 'paymentSlips')
      .where('naziv ilike :naziv', { naziv: `%${options?.naziv}%` })
      .orWhere('adresa ilike :adresa', { adresa: `%${options?.adresa}%` })
      .orWhere('mjesto ilike :mjesto', { mjesto: `%${options?.mjesto}%` })
      .orderBy('customers.inserted_at', 'DESC')
      .addOrderBy('paymentSlips.id', 'DESC')
      .getMany();
  }

  findOne(id: number) {
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
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.customerRepository.delete(item.id);
  }
}
