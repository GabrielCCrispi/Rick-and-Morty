import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    private hashPassword;
    register(name: string, email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        user: User;
        access_token: string;
    }>;
    findById(id: number): Promise<User | null>;
}
