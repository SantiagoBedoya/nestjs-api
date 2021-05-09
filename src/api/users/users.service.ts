import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';
import { WalletsRepository } from '../wallets/wallets.repository';
import { WalletsService } from '../wallets/wallets.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private walletService: WalletsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.usersRepository.create(createUserDto);
    await this.walletService.create({ user: createdUser._id });
    return createdUser;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async findOne(id: string) {
    const currentUser = await this.usersRepository.findOne(id);
    return currentUser;
  }

  async findOneByEmail(email: string) {
    const currentUser = await this.usersRepository.findOneByEmail(email);
    return currentUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.usersRepository.remove(id);
    await this.walletService.removeUserWallet(deletedUser._id);
    return deletedUser;
  }
}
