import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ARCard } from '../ar-card/ar-card.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ARCard, (arCard) => arCard.user)
  arCards: ARCard[];
}
