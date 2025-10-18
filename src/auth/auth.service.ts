import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = this.hashPassword(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<User> {
    const hashedPassword = this.hashPassword(password);

    const user = await this.userRepository.findOne({
      where: { email, password: hashedPassword },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return user;
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
