import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';

@ObjectType()
@Entity('payment_slips')
export class PaymentSlip {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  poziv_na_broj_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  poziv_na_broj_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', default: '000', nullable: true })
  iznos: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  iban_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  iban_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  model_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  model_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  sifra_namjene: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  datum_izvrsenja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  valuta_placanja: string;

  // Samo vrijednost X ili ništa
  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  hitno: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  ime_i_prezime_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  ulica_i_broj_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  ulica_i_broj_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  postanski_i_grad_platitelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  postanski_i_grad_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  naziv_primatelja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  opis_placanja: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: true })
  nalog: string;

  @Field(() => Int)
  @Column({ type: 'integer', nullable: true })
  @RelationId((entity: PaymentSlip) => entity.user)
  user_id: number;

  @Field(() => User)
  @ManyToOne(() => User, (entity) => entity.paymentSlips, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Field(() => Date)
  @CreateDateColumn()
  inserted_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
