import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@user/repository/user.repository';
import { LoginDto } from '../dto/login.dto';
import { bcryptHelper, jwtHelper } from '@utils/helper';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.expection';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async login(dto: LoginDto): Promise<BaseResponse<string>> {
    try {
      const user = await this.userRepository.getUserByEmail(dto.email);
      const isPasswordValid = await bcryptHelper.isMatch(
        user?.password,
        dto.password,
      );

      if (!user || !isPasswordValid) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'username or password is invalid',
        };
      }

      const TOKEN = jwtHelper.sign({
        email: user.email,
        isAdmin: user.isAdmin,
      });

      return {
        status: HttpStatus.OK,
        data: TOKEN,
        message: 'Successfully logged in',
      };
    } catch (err) {
      ServiceExceptions.handle(err, AuthService.name, 'login');
    }
  }

  async register(dto: RegisterDto): Promise<BaseResponse<string>> {
    try {
      const user = await this.userRepository.getUserByEmail(dto.email);
      if (user) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'user already exists',
        };
      }

      dto.password = await bcryptHelper.hash(dto.password);
      const newUser = await this.userRepository.createUser(dto);

      const TOKEN = jwtHelper.sign({
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });

      return {
        status: HttpStatus.CREATED,
        data: TOKEN,
        message: 'Successfully registered',
      };
    } catch (err) {
      ServiceExceptions.handle(err, AuthService.name, 'register');
    }
  }
}
