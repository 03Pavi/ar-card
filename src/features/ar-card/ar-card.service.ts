import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { ARCardRepository } from 'src/infrastructure/repositories/ar-card/ar-card.repository';
import { ARCard } from 'src/domain/ar-card/ar-card.entity';

@Injectable()
export class ARCardService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,

    @InjectRepository(ARCardRepository)
    private readonly arCardRepository: ARCardRepository,
  ) {}

  async createARCard(userId: string, title: string, designData: string, qrCodeUrl: string): Promise<ARCard> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return this.arCardRepository.createARCard(userId, title, designData, qrCodeUrl);
  }

  async getARCardsForUser(userId: string): Promise<ARCard[]> {
    return this.arCardRepository.findByUserId(userId);
  }

  async getARCardByQRCode(qrCodeUrl: string): Promise<ARCard | undefined> {
    return this.arCardRepository.findByQRCode(qrCodeUrl);
  }
}
