import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column('varchar', { length: 11, nullable: true })
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string):Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
