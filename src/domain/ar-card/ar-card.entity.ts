import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('ar_card')
export class ARCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  designData: string; 

  @Column({ unique: true })
  qrCodeUrl: string;

  @ManyToOne(() => User, (user) => user.arCards, {
    nullable: false, 
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' }) 
  user: User;
}
