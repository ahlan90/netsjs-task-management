import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
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
    async singIn(@Body()  authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken:string }> {
        return await this.authService.signIn(authCredentialsDto);
    }
}
