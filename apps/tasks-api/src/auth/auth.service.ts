import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: SignInDto) {
    const userFound = await this.usersService.findByEmail(user.email);
    if (!userFound) {
      throw new UnauthorizedException('User not found');
    }
    const payload = {
      email: user.email,
      sub: userFound.id,
      name: userFound.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(user: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    const newUser = await this.usersService.create({
      ...user,
    });
    return newUser;
  }
}
