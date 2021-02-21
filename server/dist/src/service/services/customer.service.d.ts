import { CreateCustomerDto } from '../../api/dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../../api/dto/customer/update-customer.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Customer } from '../../entities/customer.entity';
import { Isp } from '../../entities/isp.entity';
import { PaymentSlip } from '../../entities/payment-slip.entity';
export declare class CustomerService {
    private paymentSlipRepository;
    private ispRepository;
    private customerRepository;
    private relations;
    private excludes;
    constructor(paymentSlipRepository: Repository<PaymentSlip>, ispRepository: Repository<Isp>, customerRepository: Repository<Customer>);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        obveza: string | number;
        cijena_opreme: string | number;
        id: number;
        šifra: number;
        naziv: string;
        adresa: string;
        država: string;
        pošta: number;
        mjesto: string;
        porezni_obveznik: string;
        oib: number;
        matični_broj: number;
        šifra_djelatnosti: string;
        identifikacijski_broj: number;
        novčana_jedinica: string;
        dani_za_dospijeće: string;
        postotak_rabata: string;
        internet_stranica: string;
        transakcijski_račun: string;
        ime_prezime_kontakta: string;
        telefon: string;
        elektronska_pošta: string;
        naziv_za_slanje: string;
        adresa_za_slanje: string;
        država_za_slanje: string;
        pošta_za_slanje: string;
        mjesto_pošte_za_slanje: string;
        naziv_primatelja: string;
        adresa_primatelja: string;
        država_primatelja: string;
        pošta_primatelja: string;
        mjesto_primatelja: string;
        iznos_opreme: any;
        paymentSlips: PaymentSlip[];
        inserted_at: Date;
        updated_at: Date;
    } & Customer>;
    createMany(createCustomerDtos: CreateCustomerDto[]): Promise<any[]>;
    findAll(options?: Record<string, unknown>): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<any>;
    removeAll(): Promise<DeleteResult>;
    remove(id: number): Promise<DeleteResult>;
}
