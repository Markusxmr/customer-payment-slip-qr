import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PaymentSlip } from './payment-slip.entity';

@ObjectType()
@Entity('isps')
export class Isp {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => Int)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => Int)
  @Column({ type: 'varchar' })
  street: string;

  @Field(() => Int)
  @Column({ type: 'integer' })
  postalCode: number;

  @Field(() => Int)
  @Column({ type: 'varchar' })
  city: string;

  @Field(() => Int)
  @Column({ type: 'bigint' })
  oib: number;

  @Field(() => Int)
  @Column({ type: 'varchar', length: 21 })
  iban: string;

  @Field(() => [PaymentSlip])
  @OneToMany(() => PaymentSlip, (entity) => entity.isp, {
    eager: true,
  })
  paymentSlips: PaymentSlip[];

  @Field(() => Date)
  @CreateDateColumn()
  inserted_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
