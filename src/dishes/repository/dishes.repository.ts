import { Repository } from 'typeorm';
import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { DbExceptions } from '@utils/exceptions/dbException';
import { DishesEntity } from '../entities/dishes.entity';
import { CreateDishesDto } from '../dto/create.dishes.dto';
import { PaginationDto } from "@utils/pagination.dto";
import { DishesRes } from "../types/dishes.type";
import { FilterDto } from "../dto/filter.dto";

@CustomRepository(DishesEntity)
export class DishesRepository extends Repository<DishesEntity> {
  async createDishes(dto: CreateDishesDto & {image: string}): Promise<DishesEntity> {
    try {
      return await DishesEntity.create({
        name: dto.name,
        image: dto.image,
        type: dto.type,
        time: dto.time,
        mark: dto.mark,
        price: dto.price,
      }).save();
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async getDishes(query: FilterDto): Promise<DishesRes> {
    try {
      query.page = (query.page - 1) * query.page_size;
      const dishes = await DishesEntity.findAndCount( {
        where: {
          name: query.name,
          type: query.type,
          time: query.time,
          mark: query.mark,
          price: query.price,
        },
        skip: query.page,
        take: query.page_size,
      });

      return {
        data: dishes[0],
        count: dishes[1],
      }
    } catch (err) {
      DbExceptions.handle(err);
    }
  }
}
