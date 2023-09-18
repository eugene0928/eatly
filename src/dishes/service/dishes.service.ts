import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DishesRepository } from "../repository/dishes.repository";
import { ServiceExceptions } from "@utils/exceptions/service.expection";
import { BaseResponse } from "@utils/base.response";
import { DishesEntity } from "../entities/dishes.entity";
import { CreateDishesDto } from "../dto/create.dishes.dto";
import { PaginationDto } from "@utils/pagination.dto";
import { DishesRes } from "../types/dishes.type";

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(DishesRepository)
    private readonly dishesRepository: DishesRepository,
  ) {}

  async createDishes(dto: CreateDishesDto & {image: string}): Promise<BaseResponse<DishesEntity>> {
    try {
      const dish = await this.dishesRepository.createDishes(dto);
      return {
        status: HttpStatus.CREATED,
        data: dish,
        message: 'Successfully created',
      }
    } catch (err) {
      ServiceExceptions.handle(err, DishesService.name, 'createDishes');
    }
  }

  async getDishes(query: PaginationDto): Promise<BaseResponse<DishesRes>> {
    try {
      const dishes = await this.dishesRepository.getDishes(query);
      return {
        status: HttpStatus.OK,
        data: dishes,
        message: 'Successfully get',
      }
    } catch (err) {
      ServiceExceptions.handle(err, DishesService.name, 'getDishes');
    }
  }

}
