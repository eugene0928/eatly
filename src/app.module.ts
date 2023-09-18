import { Logger, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataSource } from '@utils/dataSource';
import { SeedService } from './seed/seed.service';
import { SeedModule } from './seed/seed.module';
import { configuration } from '@utils/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DishesModule } from "./dishes/dishes.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(configuration.getTypeOrmConfig()),
    SeedModule,
    AuthModule,
    DishesModule
  ],
  controllers: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const logger = new Logger('DataSource');
        try {
          await dataSource.initialize();
          logger.log('Data Source has been initialized');
          return dataSource;
        } catch (e) {
          logger.error('Error during Data Source initialization', e);
        }
      },
    },
    SeedService,
  ],
})
export class AppModule {}
