import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { UserRole } from '../../../controllers/users/interfaces';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PARTNER
  })
  role: string;

  @Column({ default: true })
  isActive: boolean;
}
