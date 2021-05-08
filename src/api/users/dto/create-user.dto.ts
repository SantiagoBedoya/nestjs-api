import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  username: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  password: string;
}
