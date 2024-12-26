import { Module } from '@nestjs/common';
import { ARCardModule } from './features/ar-card/ar-card.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { UserService } from './features/user/user.service';
import { UserController } from './features/user/user.controller';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    ARCardModule,
    UserModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
