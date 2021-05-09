import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateAmountDto } from './dto/update-amount.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('wallets')
@UseGuards(JwtAuthGuard)
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('myWallet')
  async getMyWallet(@Req() req: Request) {
    const currentUser: any = req.user;
    return await this.walletsService.findByUser(currentUser.userId);
  }

  @Patch('updateMyWallet')
  async updateMyWallet(
    @Req() req: Request,
    @Body() updateAmountDto: UpdateAmountDto,
  ) {
    const currentUser: any = req.user;
    return await this.walletsService.updateMyWallet(
      currentUser.userId,
      updateAmountDto,
    );
  }
}
