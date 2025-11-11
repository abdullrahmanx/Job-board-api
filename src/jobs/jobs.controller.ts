import { Controller,Post,Get,Put,Delete, Body, UseGuards, Query, Param, Patch } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './DTO/create-job-dto';
import { UserPayLoad } from 'src/common/interfaces/all-interfaces';
import { JwtAuthGuard } from 'src/common/guard/AuthGuard';
import { CurrentUser } from 'src/common/decorators/current-user';
import { GetJobsDto } from './DTO/GetJobs-dto';
import { UpdateJobDto } from './DTO/update-job-dto';
import { UpdateStatus } from './DTO/update-job-status-dto';

@Controller('jobs')
export class JobsController {
    constructor(private jobService: JobsService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async postJob(@Body() dto: CreateJobDto,@CurrentUser() user: UserPayLoad) {
        return this.jobService.postJob(dto,user)
    }

    @Get('/')
    async getJobs(@Query() query: GetJobsDto) {
        return this.jobService.getJobs(query)
    }

    @Get('/:id')
    async getJob(@Param('id') id: string) {
        return this.jobService.getJob(id)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async updateJob(@Param('id') id: string, @Body() dto: UpdateJobDto, @CurrentUser() user: UserPayLoad) {
        return this.jobService.updateJob(id,dto,user)
    }
    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    async updateStatus(@Param('id') id: string, @Body() dto: UpdateStatus, @CurrentUser() user: UserPayLoad){
        return this.jobService.updateJobStatus(id,dto,user)        
    }
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteJob(@Param('id') id: string, @CurrentUser() user: UserPayLoad) {
        return this.jobService.deleteJob(id,user)
    }

}
