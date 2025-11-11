import { IsOptional, IsEnum, IsString, IsNumber, Min, IsNotEmpty } from "class-validator";
import { Transform, Type } from "class-transformer";
import { JobType, ExperienceLevel, JobStatus } from "@prisma/client";

export class GetJobsDto {

    @IsOptional()
    @IsNumber()
    @Min(1)
    page?: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number

    @IsOptional()
    @IsString()
    search?: string
    
    @IsOptional()
    @IsEnum(JobStatus)
    status?: JobStatus

     
    @IsOptional()
    @Transform(({value}) => value.toUpperCase())
    @IsEnum(JobType)
    type?: JobType

    @IsOptional()
    @IsEnum(ExperienceLevel)
    experienceLevel?: ExperienceLevel;

}