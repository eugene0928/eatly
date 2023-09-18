import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { DISHES_TYPE } from '../enums/dishes.enum';
import { Transform } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class CreateDishesDto {
  @ApiProperty({name: 'name', type: String, description: 'Name of dish', required: true, minLength: 3, maxLength: 100})
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @ApiProperty({name: 'type', type: DISHES_TYPE, description: 'type of dish', required: true, enum: DISHES_TYPE})
  @IsNotEmpty()
  @IsEnum(DISHES_TYPE)
  type: DISHES_TYPE;

  @ApiProperty({name: 'time', type: Number, description: 'time of dish', required: true})
  @IsNotEmpty()
  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch (err) {
      return value;
    }
  })
  time: number;

  @ApiProperty({name: 'mark', type: Number, description: 'mark of dish', required: true})
  @IsNotEmpty()
  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch (err) {
      return value;
    }
  })
  mark: number;

  @ApiProperty({name: 'price', type: Number, description: 'price of dish', required: true})
  @IsNotEmpty()
  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch (err) {
      return value;
    }
  })
  price: number;


  @ApiProperty({ type: 'string', format: 'binary', description: 'file' })
  file: Express.Multer.File;
}
