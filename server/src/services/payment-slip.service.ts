import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentSlipDto } from '../modules/api/dto/payment-slip/create-payment-slip.dto';
import { UpdatePaymentSlipDto } from '../modules/api/dto/payment-slip/update-payment-slip.dto';
import { Repository } from 'typeorm';
import { PaymentSlip } from '../entities/payment-slip.entity';
import { dto } from '../common/utils/dto.util';
import { paymentSlipDomain, setIspPaymentSlip } from '../domain/payment-slip.domain';
import { controlNumber } from '../domain/control-number';
import { Isp } from '../entities/isp.entity';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class PaymentSlipService {
  private relations = ['customer'];

  constructor(
    @Inject('PAYMENT_SLIP_REPOSITORY')
    private paymentSlipRepository: Repository<PaymentSlip>,
    @Inject('ISP_REPOSITORY')
    private ispRepository: Repository<Isp>,
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createPaymentSlipDto: CreatePaymentSlipDto) {
    let item = new PaymentSlip();
    let isp = await this.ispRepository.findOne({ where: { id: createPaymentSlipDto?.isp_id } });
    let customer = await this.customerRepository.findOne({ where: { id: createPaymentSlipDto?.customer_id } });
    let paymentSlips = customer?.paymentSlips?.sort((a, b) => b?.mjesec - a?.mjesec);
    let sortedPaymentSlip = paymentSlips.length > 0 ? paymentSlips[0] : { mjesec: 0 };

    let updateItem = paymentSlipDomain({ isp, customer }, sortedPaymentSlip?.mjesec + 1);
    createPaymentSlipDto = { ...createPaymentSlipDto, ...updateItem };
    item = { ...item, ...createPaymentSlipDto };
    return this.paymentSlipRepository.save(item);
  }

  createMany(createPaymentSlipDtos: CreatePaymentSlipDto[]) {
    let items = [];
    for (const item of createPaymentSlipDtos) {
      items.push(item);
    }
    return this.paymentSlipRepository.save(items);
  }

  saveMany(updatePaymentSlipDtos: CreatePaymentSlipDto[]) {
    let items = [];
    for (const item of updatePaymentSlipDtos) {
      items.push(item);
    }
    return this.paymentSlipRepository.save(items);
  }

  async findAll() {
    // Use the repository's find method with ordering instead of a raw SQL query.
    const items = await this.paymentSlipRepository.find({ order: { id: 'DESC' } });
    return dto(items, ['inserted_at', 'updated_at', 'deleted_at']);
  }

  async updateAllPaymentSlips() {
    // Retrieve all payment slips ordered by id descending.
    const items = await this.paymentSlipRepository.find({ order: { id: 'DESC' } });

    for (const item of items) {
      // Fetch the related customer from the Customer repository.
      const customer = await this.paymentSlipRepository.manager
        .getRepository(Customer)
        .findOne({ where: { id: item.customer_id } });
      // Build the prefix (šifra) if available.
      const šifra = customer?.šifra ? `${customer.šifra}-` : '';
      // Generate the 'poziv_na_broj_primatelja' using the customer's šifra and controlNumber logic.
      const poziv_na_broj_primatelja = `${šifra}${controlNumber(customer?.šifra)}`;
      // Update the payment slip with the new field.
      await this.update(item.id, { poziv_na_broj_primatelja });
    }
  }

  async findAllBy(options) {
    const items = await this.paymentSlipRepository.find({
      relations: this.relations,
      where: {
        customer_id: options?.customer_id,
      },
      order: {
        id: 'DESC',
      },
    });
    return dto(items, ['inserted_at', 'updated_at', 'deleted_at']);
  }

  findOne(id: number) {
    return this.paymentSlipRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePaymentSlipDto: UpdatePaymentSlipDto) {
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();

    let updatedIsp;
    for (const key of Object.keys(updatePaymentSlipDto)) {
      if (key === 'isp_id' && item?.isp_id !== updatePaymentSlipDto[key]) {
        let requestIspId = updatePaymentSlipDto[key];
        let isp = await this.ispRepository.findOne({ where: { id: requestIspId } });
        updatedIsp = setIspPaymentSlip(isp);
        updatePaymentSlipDto = { ...updatePaymentSlipDto, ...updatedIsp };
      }
    }

    return this.paymentSlipRepository.save({
      ...item,
      ...updatePaymentSlipDto,
    });
  }

  async remove(id: number) {
    if (!id) throw new NotFoundException('Id not provided');
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.paymentSlipRepository.delete(item.id);
  }
}
