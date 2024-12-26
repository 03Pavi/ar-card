import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ARCardService } from './ar-card.service';
import { ARCard } from 'src/domain/ar-card/ar-card.entity';

@Controller('ar-cards')
export class ARCardController {
  constructor(private readonly arCardService: ARCardService) {}

  @Post()
  async createARCard(
    @Body() body: { userId: string; title: string; designData: string; qrCodeUrl: string }
  ): Promise<ARCard> {
    return this.arCardService.createARCard(body.userId, body.title, body.designData, body.qrCodeUrl);
  }

  @Get(':userId')
  async getARCardsForUser(@Param('userId') userId: string): Promise<ARCard[]> {
    return this.arCardService.getARCardsForUser(userId);
  }

  @Get('qr/:qrCodeUrl')
  async getARCardByQRCode(@Param('qrCodeUrl') qrCodeUrl: string): Promise<ARCard | undefined> {
    return this.arCardService.getARCardByQRCode(qrCodeUrl);
  }
}
