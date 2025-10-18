import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        id: number;
        name: string;
        email: string;
        access_token: string;
    }>;
    logout(): Promise<{
        message: string;
    }>;
    verify(req: any): Promise<{
        id: any;
        name: any;
        email: any;
    }>;
}
