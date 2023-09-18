import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { DishesRepository } from "./repository/dishes.repository";
import { DishesController } from "./controller/dishes.controller";
import { DishesService } from "./service/dishes.service";

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([DishesRepository]),
  ],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
