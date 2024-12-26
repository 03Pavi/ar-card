import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OutboxStatus } from './enums/outbox-message-status.enum';
@Entity('outbox_message')
export class OutboxMessage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid',unique: true })
  message_id: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'jsonb' })
  headers: any;

  @Column({ type: 'jsonb' })
  properties: any;

  @Column({ type: 'jsonb' })
  body: any;

  @Column({ type: 'enum', enum: OutboxStatus, default: OutboxStatus.PENDING })
  status: OutboxStatus;

  @Column({ type: 'timestamp', nullable: true })
  sent_at: Date;

  public markAsSent(): void {
    if (this.status === OutboxStatus.SENT) {
      throw new Error('Message is already marked as sent.');
    }
    
    this.status = OutboxStatus.SENT;
    this.sent_at = new Date();
  }
}