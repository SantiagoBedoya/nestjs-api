import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateAmountDto {
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  amount: number;
}
