import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration as config } from 'src/config/configuration';
import { User } from './entities/User';
import { Activity } from './entities/Activity';
import { UserActivity } from './entities/UserActivity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: config().db.host,
        port: config().db.port,
        username: config().db.username,
        password: config().db.password,
        database: config().db.database,
        // TypeOrm 'synchronize' property, which if true allows TypeOrm to automatically create and update tables based on entities. Not recommended for production due to possible data loss
        synchronize: config().env === 'dev' ? true : false,
        logging: true,
        entities: [User, Activity, UserActivity],
        // ...require('../../ormconfig.json'),
      }),
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}