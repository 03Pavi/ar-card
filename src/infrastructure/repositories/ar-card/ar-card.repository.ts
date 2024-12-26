import { Repository } from 'typeorm';
import { ARCard } from 'src/domain/ar-card/ar-card.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ARCardRepository extends Repository<ARCard> {
  async findByQRCode(qrCodeUrl: string): Promise<ARCard | undefined> {
    return this.findOne({ where: { qrCodeUrl } });
  }

  async findByUserId(userId: string): Promise<ARCard[]> {
    return this.find({ where: { user: { id: userId } } });
  }

  async createARCard(userId: string, title: string, designData: string, qrCodeUrl: string): Promise<ARCard> {
    const arCard = this.create({ title, designData, qrCodeUrl });
    arCard.user = { id: userId } as any; // assuming user object is passed
    return this.save(arCard);
  }
}
