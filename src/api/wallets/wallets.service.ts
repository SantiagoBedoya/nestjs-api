import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletsRepository } from './wallets.repository';
import { UpdateAmountDto } from './dto/update-amount.dto';

@Injectable()
export class WalletsService {
  constructor(private walletsRepository: WalletsRepository) {}

  private generateCreditNumber() {
    let cardNumber = '';
    for (let i = 0; i < 3; i++) {
      if (cardNumber.length > 0) {
        cardNumber += '-' + Math.round(Math.random() * 10000);
      } else {
        cardNumber += Math.round(Math.random() * 10000);
      }
    }
    let now = Date.now().toString();
    while (now.length > 4) {
      const str = now.substring(0, 4);
      cardNumber += '-' + str;
      now = str;
    }
    return cardNumber;
  }

  async create(createWalletDto: CreateWalletDto) {
    createWalletDto.creditNumber = this.generateCreditNumber();
    const createdWallet = await this.walletsRepository.create(createWalletDto);
    return createdWallet;
  }

  async findAll() {
    const wallets = await this.walletsRepository.findAll();
    return wallets;
  }

  async findOne(id: string) {
    const wallet = await this.walletsRepository.findOne(id);
    return wallet;
  }

  async findByUser(userId: string) {
    const wallet = await this.walletsRepository.findByUser(userId);
    return wallet;
  }

  async updateMyWallet(userId: string, updateAmountDto: UpdateAmountDto) {
    console.log(userId);
    const myWallet = await this.walletsRepository.findByUser(userId);
    const updatedWallet = await this.walletsRepository.update(
      myWallet._id,
      updateAmountDto,
    );
    return updatedWallet;
  }

  async removeUserWallet(userId: string) {
    const currentWallet = await this.walletsRepository.findByUser(userId);
    const deletedWallet = await this.walletsRepository.remove(
      currentWallet._id,
    );
    return deletedWallet;
  }

  async remove(id: string) {
    const deletedWallet = await this.walletsRepository.remove(id);
    return deletedWallet;
  }
}
