import { Controller,Post,Get,Put,Delete,Body, Param, BadRequestException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/register-dto';
import { LoginDto } from './DTO/login-dto';
import { JwtService } from '@nestjs/jwt';
import { UserPayLoad } from 'src/common/interfaces/all-interfaces';
import { CurrentUser } from 'src/common/decorators/current-user';
import { ForgotPassowrdDto } from './DTO/forgot-password-dto';
import { ResetPasswordDto } from './DTO/reset-password-dto';
import { ChangePasswordDto } from './DTO/change-password-dto';
import { JwtAuthGuard  } from 'src/common/guard/AuthGuard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private jwtService: JwtService
    ) {}

    @Post('/register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @Get('/verify-email/:token')
    async verifyEmail(@Param('token') token: string) {
        return this.authService.verifyEmail(token)
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    } 
    
    @Post('/refresh-token')
    async refreshToken(@Body('refreshToken') refreshToken: string) {
        if(!refreshToken) {
            throw new BadRequestException('Refresh token is required')
        }
        let payload

        try {
        payload= this.jwtService.verify(refreshToken,{secret: process.env.JWT_REFRESH})

        }catch(err){
            throw new UnauthorizedException('Invalid token')
        }

        return this.authService.refreshToken(refreshToken,payload.id)
    }

    
    @Post('/logout')
    @UseGuards(JwtAuthGuard)
    async logout(@CurrentUser() user: UserPayLoad) {
        return this.authService.logout(user.id)
    }    

    @Post('forgot-password')
    async forgotPassword(@Body() dto: ForgotPassowrdDto) {
        return this.authService.forgotPassword(dto)
    }

    @Post('reset-password/:token')
    async resetPassword(@Body() dto: ResetPasswordDto, @Param('token') token: string) {
        return this.authService.resetPassword(dto,token)
    }  

    @UseGuards(JwtAuthGuard)
    @Put('change-password')
    async changePassword(@Body() dto: ChangePasswordDto,@CurrentUser() user: UserPayLoad) {
        return this.authService.changePassword(dto,user)
    } 

}
