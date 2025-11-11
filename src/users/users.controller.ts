import { Controller,Body,UseGuards,Get,Put,Delete, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guard/AuthGuard';
import { CurrentUser } from 'src/common/decorators/current-user';
import { UpdateProfileDto } from './DTO/update-user-dto';
import { DeleteUserDto } from './DTO/delete-user-dto';
import { UserPayLoad } from 'src/common/interfaces/all-interfaces';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@CurrentUser() user: UserPayLoad) {
        return this.userService.getProfile(user)
    }

    @UseGuards(JwtAuthGuard)
    @Put('me')
    @UseInterceptors(FileInterceptor('logo'))
    async updateProfile (@Body() dto: UpdateProfileDto,
    @CurrentUser() user: UserPayLoad,
    @UploadedFile() file?: Express.Multer.File) {
        return this.userService.updateProfile(dto,user,file)
    }
    @UseGuards(JwtAuthGuard)
    @Delete('/me')
    async deleteUser(@Body() dto: DeleteUserDto,@CurrentUser() user: UserPayLoad) {
        return this.userService.deleteUser(dto,user)
    }
}