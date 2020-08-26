import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  role: string;

  @Column('varchar', { length: 11, nullable: true })
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
