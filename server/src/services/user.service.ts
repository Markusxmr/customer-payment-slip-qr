import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../modules/api/dto/user/create-user.dto';
import { UpdateUserDto } from '../modules/api/dto/user/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { dto } from '../common/utils/dto.util';
import { AppDataSource } from '../modules/database/database.providers';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    let item = new User();
    item = { ...item, ...createUserDto };
    return this.userRepository.save(item);
  }

  createMany(createUserDtos: CreateUserDto[]) {
    let items = [];
    for (const item of createUserDtos) {
      items.push(item);
    }
    return this.userRepository.insert(items);
  }

  async findAll() {
    const items = await AppDataSource.query(`select * from isps order by id desc`);
    return dto(items, ['inserted_at', 'updated_at']);
  }

  async findOne(id: number) {
    const item = await this.userRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    return item;
  }

  async findOneDefault() {
    const item = await this.userRepository.findOne({
      order: { id: 'ASC' },
    });
    if (!item) throw new NotFoundException();
    return item;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.userRepository.save({
      ...item,
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    if (!id) throw new NotFoundException('Id not provided');
    let item = await this.findOne(id);
    if (!item) throw new NotFoundException();
    return this.userRepository.delete(item.id);
  }
}
