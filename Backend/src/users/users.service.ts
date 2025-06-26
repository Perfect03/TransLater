import { Injectable, Inject } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const project = this.userRepository.create(dto);
    return this.userRepository.save(project);
  }

  async getAllUsers() {
    const users = this.userRepository.find();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}})
    return user
  }
}
