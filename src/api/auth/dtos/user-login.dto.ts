import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    required: true,
  })
  email: string;

  @ApiProperty({
    required: true,
  })
  password: string;
}
