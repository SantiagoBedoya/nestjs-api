import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateAmountDto } from './dto/update-amount.dto';
import { Wallet, WalletDocument } from './entities/wallet.entity';
import { Model, FilterQuery } from 'mongoose';

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}
  async create(createWalletDto: CreateWalletDto) {
    const createdWallet = new this.walletModel(createWalletDto);
    return await createdWallet.save();
  }

  async findAll() {
    const wallets = await this.walletModel.find().populate({ path: 'user' });
    return wallets;
  }

  async findByUser(userId: string) {
    const wallet = await this.walletModel.findOne({
      user: userId,
    } as FilterQuery<WalletDocument>);
    return wallet;
  }

  async findOne(id: string) {
    const wallet = await this.walletModel.findById(id);
    return wallet;
  }

  async update(id: string, updateAmountDto: UpdateAmountDto) {
    const currentWallet = await this.walletModel.findById(id);
    if (!currentWallet) {
      return null;
    }
    currentWallet.amount += updateAmountDto.amount;
    await currentWallet.save();
    return currentWallet;
  }

  async remove(id: string) {
    const deletedWallet = await this.walletModel.findByIdAndDelete(id);
    return deletedWallet;
  }
}
