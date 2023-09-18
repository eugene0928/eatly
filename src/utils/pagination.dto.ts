import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
  @ApiProperty({name: 'page', type: Number, description: 'page', required: false, default: 1, minimum: 1})
  @IsOptional()
  @Transform((data) => {
    try {
      return +data.value;
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  page?: number = 1;

  @ApiProperty({name: 'page_size', type: Number, description: 'page size', required: false, default: 10, minimum: 1})
  @IsOptional()
  @Transform((data) => {
    try {
      return +data.value;
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  page_size?: number = 10;
}
