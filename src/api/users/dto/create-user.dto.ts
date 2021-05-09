import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
