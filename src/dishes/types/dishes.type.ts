import { DishesEntity } from "../entities/dishes.entity";

export type DishesRes = {
  data: DishesEntity[],
  count: number
}