import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
        ) {}
    
    @Post('/signup')
    async singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    async singIn(@Body()  authCredentialsDto: AuthCredentialsDto) {
        return await this.authService.signIn(authCredentialsDto);
    }
}
