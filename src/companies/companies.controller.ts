import { Body, Controller, Post,Get,Put,Delete, Query, UploadedFile, UseGuards, UseInterceptors, Param } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from 'src/common/guard/AuthGuard';
import { CreateCompanydDto } from './DTO/create-company-dto';
import { UserPayLoad } from 'src/common/interfaces/all-interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/common/decorators/current-user';
import { GetCompaniesDto } from './DTO/GetCompaniteDto';
import { UpdateCompanyDto } from './DTO/update-company-dto';

@Controller('companies')
export class CompaniesController {
    constructor(private companyService: CompaniesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    @UseInterceptors(FileInterceptor('logo'))
    async createCompany(@Body() dto: CreateCompanydDto,
     @CurrentUser() user: UserPayLoad,   @UploadedFile() file?: Express.Multer.File) {
        return this.companyService.createCompany(dto,user,file)
    }
    
    @Get('/')
    async getCompanies(@Query() query: GetCompaniesDto) {
        return this.companyService.getCompanies(query)
    }

    @Get('/:id')
    async getCompany(@Param('id') id: string) {
        return this.companyService.getCompany(id)
    }

     @UseGuards(JwtAuthGuard)
     @Put('/:id')
     @UseInterceptors(FileInterceptor('logo'))  
     async updateCompany(@Param('id') id: string,@Body() dto: UpdateCompanyDto,
        @CurrentUser() user: UserPayLoad, @UploadedFile() file?: Express.Multer.File) {
            return this.companyService.updateCompany(id,dto,user,file)
     }

     @UseGuards(JwtAuthGuard)
     @Delete('/:id')
     async deleteCompany(@Param('id') id: string, @CurrentUser() user: UserPayLoad) {
        return this.companyService.deleteCompany(id,user)
     }

 }
