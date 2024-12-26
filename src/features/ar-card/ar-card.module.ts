import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { ARCardRepository } from 'src/infrastructure/repositories/ar-card/ar-card.repository';
import { ARCardService } from './ar-card.service';
import { ARCardController } from './ar-card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, ARCardRepository])],
  providers: [ARCardService],
  controllers: [ARCardController],
})
export class ARCardModule {}
