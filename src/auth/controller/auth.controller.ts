import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from "../dto/register.dto";

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: LoginDto, @Res() response: Response) {
    const res = await this.authService.login(dto);
    response.status(res.status).json(res);
  }

  @Post('/register')
  async register(@Body() dto: RegisterDto, @Res() response: Response) {
    const res = await this.authService.register(dto);
    response.status(res.status).json(res);
  }
}
