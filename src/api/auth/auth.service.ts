import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dtos/user-login.dto';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from '../responses/ApiResponse';
import { AuthResponse } from './interfaces/auth-response.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { RegisterResponse } from './interfaces/register-response.interface';
import { UsersRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async authenticate(
    userLoginDto: UserLoginDto,
  ): Promise<ApiResponse<AuthResponse | null>> {
    const currentUser = await this.usersRepository.findOneByEmail(
      userLoginDto.email,
    );
    if (!currentUser) {
      return {
        data: null,
        message: "User doesn't exist",
        statusCode: 404,
      };
    }
    const isMatch = bcrypt.compareSync(
      userLoginDto.password,
      currentUser.password,
    );
    if (isMatch) {
      const token = this.generateToken({
        sub: currentUser._id,
        username: currentUser.username,
      });
      return {
        data: { token },
        message: 'User is loggued',
        statusCode: 200,
      };
    } else {
      return {
        statusCode: 401,
        message: 'Invalid password or email',
        data: null,
      };
    }
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<ApiResponse<RegisterResponse | null>> {
    const existUser = await this.usersRepository.findOneByEmail(
      createUserDto.email,
    );
    if (existUser) {
      return {
        statusCode: 400,
        message: 'This email is already in use',
        data: null,
      };
    }
    const createdUser = await this.usersRepository.create(createUserDto);

    const token = this.generateToken({
      sub: createdUser._id,
      username: createdUser.username,
    });

    return {
      statusCode: 201,
      message: `Welcome ${createdUser.username}!`,
      data: { token },
    };
  }

  private generateToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: 60 * 60 * 24,
    });
  }
}
