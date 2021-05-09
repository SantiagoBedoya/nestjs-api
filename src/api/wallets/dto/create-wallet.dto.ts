import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateWalletDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  user: string;
  creditNumber?: string;
}
