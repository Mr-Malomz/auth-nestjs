import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSignUpDto: AuthSignUpDto): Promise<string> {
    const { email, password, firstname, lastname } = authSignUpDto;

    const user = new User();
    user.email = email;
    //encrypting password
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.firstname = firstname;
    user.lastname = lastname;

    try {
      await user.save();
      return 'User created successfully';
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  //private method to encrypt password
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
