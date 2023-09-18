import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { RegisterDto } from '../../auth/dto/register.dto';
import { DbExceptions } from '@utils/exceptions/dbException';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      return await UserEntity.findOne({
        where: {
          email,
        },
      });
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async createUser(dto: RegisterDto): Promise<UserEntity> {
    try {
      return await UserEntity.create({
        name: dto.name,
        email: dto.email,
        password: dto.password,
      }).save();
    } catch (err) {
      DbExceptions.handle(err);
    }
  }
}
