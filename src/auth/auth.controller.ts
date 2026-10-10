import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.ts';
import { AuthService } from './auth.service.ts';
import { LoginDto } from './dto/login.dto.ts';
import { ChangePasswordDto } from './dto/change-password.dto.ts';
import { JwtAuthGuard } from '../guards/jwt-auth.guard.ts';
import { AuthenticatedUser, CurrentUser } from '../decorators/current-user.decorator.ts';
import { minutes, Throttle } from '@nestjs/throttler';

@Controller('auth')
@Throttle({ default: { limit: 30, ttl: minutes(30) } })
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    changePassword(@Body() changePasswordDto: ChangePasswordDto, @CurrentUser() user: AuthenticatedUser) {
        return this.authService.changePassword(changePasswordDto, user.sub);
    }

}