import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ description: 'name', type: 'string', required: true})
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'password', type: 'string', required: true})
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'email', type: 'string', required: true})
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
