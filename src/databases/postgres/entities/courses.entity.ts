import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MinLength, MaxLength, IsOptional } from 'class-validator';

export class CoursesDto {
  @MinLength(5)
  @MaxLength(50)
  public title!: string;

  @IsOptional()
  public isActive!: boolean;
}

@Entity()
export class Courses {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id!: number;

  @Column({ unique: true, nullable: false })
  public title!: string;

  @Column({ nullable: false })
  public isActive!: boolean;
}
