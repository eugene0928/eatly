import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { Response } from 'express';
import { DishesService } from "../service/dishes.service";
import { CreateDishesDto } from "../dto/create.dishes.dto";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { FilterDto } from "../dto/filter.dto";
import {
  ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { myStorage } from "@utils/multer.conf";

@ApiTags('dishes')
@Controller('api')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @ApiCreatedResponse({ description: 'Dishes created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseInterceptors(FileInterceptor('file', { storage: myStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'dishes body',
    type: CreateDishesDto
  })
  @ApiBearerAuth()
  @Post('/dishes')
  @UseGuards(JwtGuard)
  async createDishes(@Body() dto: CreateDishesDto  & {image: string}, @UploadedFile() file: Express.Multer.File, @Res() response: Response) {
    dto.image = file.filename;
    const res = await this.dishesService.createDishes(dto);
    response.status(res.status).json(res);
  }

  @ApiOkResponse({ description: 'Dishes found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiQuery({name: 'query', type: FilterDto, description: 'Query for dishes'})
  @Get('/dishes')
  async getDishes(@Query() query: FilterDto, @Res() response: Response) {
    const res = await this.dishesService.getDishes(query);
    response.status(res.status).json(res);
  }
}
