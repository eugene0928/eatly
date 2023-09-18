import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ description: 'email', type: 'string', required: true})
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'password', type: 'string', required: true})
  @IsNotEmpty()
  password: string;
}
