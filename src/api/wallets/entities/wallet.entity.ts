import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema({ versionKey: false, timestamps: true })
export class Wallet {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true })
  user: User;

  @Prop({ type: String, unique: true })
  creditNumber: string;

  @Prop({ type: Number, default: 0 })
  amount: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
