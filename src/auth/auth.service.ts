import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ message: string; user: { id: string; email: string; name: string } }> {
    try {
      const user = await this.usersService.create(createUserDto);
      const { password, ...userInfo } = user.toObject();
      return {
        message: 'User registered successfully',
        user: {
          id: userInfo._id.toString(),
          email: userInfo.email,
          name: userInfo.name,
        },
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Registration failed');
    }
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; user: { id: string; email: string; name: string } }> {
    const { email, password } = loginDto;

    console.log(`Login attempt for email: ${email}`);

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      console.log(`User not found for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log(`User found: ${JSON.stringify({ id: user._id.toString(), email: user.email })}`);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Password verification failed for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id.toString(), email: user.email, name: user.name };
    const access_token = await this.jwtService.signAsync(payload);

    console.log(`JWT generated for email: ${email}`);

    return {
      access_token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };
  }
}