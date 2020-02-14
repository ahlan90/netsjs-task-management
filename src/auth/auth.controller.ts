import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

    @Post('/signup')
    singUp(@Body() authCredentialsDto: AuthCredentialsDto) {
        console.log('Auth', authCredentialsDto);
        
    }
}
