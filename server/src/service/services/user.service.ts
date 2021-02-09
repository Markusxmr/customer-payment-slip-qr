import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../api/dto/user/create-user.dto';
import { UpdateUserDto } from '../../api/dto/user/update-user.dto';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    let item = new User();
    return this.userRepository.save({ ...item, ...createUserDto });
  }

  createMany(createUserDtos: CreateUserDto[]) {
    let items = [];
    for (const item of createUserDtos) {
      items.push(item);
    }
    return this.userRepository.save(items);
  }

  findAll(options?: Record<string, unknown>) {
    return this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.paymentSlips', 'paymentSlips')
      .where('naziv ilike :naziv', { naziv: `%${options?.naziv}%` })
      .orWhere('adresa ilike :adresa', { adresa: `%${options?.adresa}%` })
      .orWhere('mjesto ilike :mjesto', { mjesto: `%${options?.mjesto}%` })
      .orderBy('users.inserted_at', 'DESC')
      .addOrderBy('paymentSlips.id', 'DESC')
      .getMany();
  }

  findOne(id: number) {
    return this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.paymentSlips', 'paymentSlips')
      .orderBy('paymentSlips.id', 'DESC')
      .where('users.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.userRepository.save({ ...item, ...updateUserDto });
  }

  async removeAll() {
    await this.userRepository
      .createQueryBuilder('users')
      .delete()
      .from(User)
      .execute();
    return new DeleteResult();
  }

  async remove(id: number) {
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.userRepository.delete(item.id);
  }
}
