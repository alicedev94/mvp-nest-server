import { Injectable } from '@nestjs/common';
import { User } from '../users/interfaces/user';
import { CreatedUser } from './interfaces/create-user-interfaces';
import { UpdateUser } from './interfaces/update-user-interfaces';
import { Role } from '../auth/enums/role.enum';

// database dependency
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, Not } from 'typeorm';
import { User as UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<CreatedUser[]> {
    return await this.usersRepository.find({
      where: {
        status: Not('0'),
      },
    });
  }

  async findOne(email: any): Promise<any> {
    const user: any[] = [];
    user.push(
      await this.usersRepository.findOne({
        where: { email: email, status: Not('0') },
      }),
    );
    return user;
  }

  async findOneById(id: any): Promise<any> {
    const user: any[] = [];
    user.push(
      await this.usersRepository.findOne({
        where: { id: id, status: Not('0') },
      }),
    );
    return user[0];
  }

  async save(user: any): Promise<CreatedUser> {
    return await this.usersRepository.save(user);
  }

  async update(user: UpdateUser, id: string): Promise<UpdateResult> {
    return await this.usersRepository.update(id, user);
  }

  async disable(user: any, id: string): Promise<UpdateResult> {
    return await this.usersRepository.update(id, user);
  }

  async delete(id: string) {
    return await this.usersRepository.delete(id);
  }
}
