import { Entity, Column, OneToMany } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';

@Entity('users')
export class UserEntity extends GeneralEntity {
  @Column({ type: 'varchar', name: 'name', nullable: false })
  name: string;

  @Column({ type: 'boolean', name: 'isAdmin', default: false })
  isAdmin: boolean;

  @Column({ type: 'varchar', name: 'password', nullable: false })
  password: string;

  @Column({ type: 'varchar', name: 'email', nullable: false, unique: true })
  email: string;
}
