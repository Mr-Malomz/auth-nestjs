import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSignUpDto: AuthSignUpDto): Promise<string> {
    const { email, password, firstname, lastname } = authSignUpDto;

    const user = new User();
    user.email = email;
    user.password = password;
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
}
