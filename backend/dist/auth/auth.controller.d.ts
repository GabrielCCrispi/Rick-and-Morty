import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        name: string;
        email: string;
        password: string;
    }): unknown;
    login(body: {
        email: string;
        password: string;
    }): unknown;
    logout(): unknown;
    verify(req: any): unknown;
}
