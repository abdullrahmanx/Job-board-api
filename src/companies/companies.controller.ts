import { Body, Controller, Post,Get,Put,Delete, Query, UploadedFile, UseGuards, UseInterceptors, Param } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from 'src/common/guard/AuthGuard';
import { CreateCompanydDto} from './DTO/create-company-dto';
import { UserPayLoad } from 'src/common/interfaces/all-interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/common/decorators/current-user';
import { GetCompaniesDto } from './DTO/GetCompaniteDto';
import { UpdateCompanyDto } from './DTO/update-company-dto';
import { ApiBearerAuth, ApiBody,ApiQuery, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
@Controller('companies')
export class CompaniesController {
    constructor(private companyService: CompaniesService) {}

    @UseGuards(JwtAuthGuard)
    @Throttle({ medium: { limit: 3, ttl: 3600000 } })
    @Post('/')
    @UseInterceptors(FileInterceptor('logo'))
    async createCompany(@Body() dto: CreateCompanydDto,
     @CurrentUser() user: UserPayLoad,   @UploadedFile() file?: Express.Multer.File) {
        return this.companyService.createCompany(dto,user,file)
    }
    

    @SkipThrottle()
    @Get('/')
    async getCompanies(@Query() query: GetCompaniesDto) {
        return this.companyService.getCompanies(query)
    }

    @SkipThrottle()
    @Get('/:id')
    async getCompany(@Param('id') id: string) {
        return this.companyService.getCompany(id)
    }

     @UseGuards(JwtAuthGuard)
     @Throttle({ strict: { limit: 20, ttl: 60000 } })
     @Put('/:id')
     @UseInterceptors(FileInterceptor('logo'))  
     async updateCompany(@Param('id') id: string,@Body() dto: UpdateCompanyDto,
        @CurrentUser() user: UserPayLoad, @UploadedFile() file?: Express.Multer.File) {
            return this.companyService.updateCompany(id,dto,user,file)
     }


     @UseGuards(JwtAuthGuard)
     @Throttle({ medium: { limit: 3, ttl: 3600000 } })
     @Delete('/:id')
     async deleteCompany(@Param('id') id: string, @CurrentUser() user: UserPayLoad) {
        return this.companyService.deleteCompany(id,user)
     }

 }
