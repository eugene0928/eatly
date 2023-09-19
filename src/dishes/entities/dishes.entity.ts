import { Column, Entity } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { DISHES_TYPE } from '../enums/dishes.enum';

@Entity({ name: 'dishes' })
export class DishesEntity extends GeneralEntity {
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'image' })
  image: string;

  @Column({ type: 'enum', name: 'type', enum: DISHES_TYPE })
  type: DISHES_TYPE;

  @Column({ type: 'decimal', name: 'time' })
  time: number;

  @Column({ type: 'decimal', name: 'mark', precision: 6, scale: 2 })
  mark: number;

  @Column({ type: 'decimal', name: 'price', precision: 6, scale: 2 })
  price: number;
}
