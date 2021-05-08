import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  public async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const response = await this.authService.authenticate(userLoginDto);
    return res.status(response.statusCode).json({ ...response });
  }
  @Post('signup')
  public async signup(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const response = await this.authService.register(createUserDto);
    return res.status(response.statusCode).json({ ...response });
  }
}
