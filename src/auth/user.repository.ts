import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { SignInResponse } from './dto/auth-signinresponse.dto';

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

  async signIn(authSignInDto: AuthSignInDto): Promise<SignInResponse> {
    const { email, password } = authSignInDto;

    const user = await this.findOne({ email });

    if (user && user.validatePassword(password)) {
      const userResponse = new SignInResponse();

      userResponse.firstname = user.firstname;
      userResponse.lastname = user.lastname;
      userResponse.email = user.email;
      userResponse.phoneNumber = user.phoneNumber;

      return userResponse;
    } else {
      return null;
    }
  }
}
