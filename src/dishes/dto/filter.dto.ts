import { PaginationDto } from "@utils/pagination.dto";
import { IsEnum, IsOptional } from "class-validator";
import { DISHES_TYPE } from "../enums/dishes.enum";
import { Transform } from "class-transformer";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class FilterDto extends PartialType(PaginationDto) {
  @ApiProperty({name: 'name', type: String, description: 'name of dish', required: false})
  @IsOptional()
  name?: string;

  @ApiProperty({name: 'type', description: 'type of dish', required: false, enum: DISHES_TYPE})
  @IsOptional()
  @IsEnum(DISHES_TYPE)
  type?: DISHES_TYPE;

  @ApiProperty({name: 'time', type: Number, description: 'time of dish', required: false})
  @IsOptional()
  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch (err) {
      return value;
    }
  })
  time?: number;

  @ApiProperty({name: 'mark', type: Number, description: 'mark of dish', required: false})
  @IsOptional()
  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch (err) {
      return value;
    }
  })
  mark?: number;

  @ApiProperty({name: 'price', type: Number, description: 'price of dish', required: false})
  @IsOptional()
  @Transform(({ value }) => {
    try {
      return Number(value);
    } catch (err) {
      return value;
    }
  })
  price?: number;
}