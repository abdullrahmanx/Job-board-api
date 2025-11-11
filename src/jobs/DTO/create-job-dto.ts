import { ExperienceLevel, JobStatus,JobType } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsOptional,IsNotEmpty,MinLength,Min,MaxLength,IsString,IsNumber, IsEnum, IsDateString, IsUUID } from "class-validator";


export class CreateJobDto {

    @IsNotEmpty()
    @IsUUID()
    companyId: string


    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(40)
    title: string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(2000)
    description: string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    location: string

    @IsOptional()
    @IsNumber()
    @Min(1)
    salary?: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    salaryMax?: number

    
    @IsOptional()
    @IsString()
    currency?: string


    
    @IsOptional()
    @Transform(({value}) => value.toUpperCase())
    @IsEnum(JobType)
    type: JobType 


    
    @IsOptional()
    @IsString()
    @MinLength(10)
    @MaxLength(1000)
    requirements?: string

    @IsOptional()
    benefits?: string[]

    @IsOptional()
    @Transform(({value}) => value.toUpperCase())
    @IsEnum(ExperienceLevel)
    experienceLevel?: ExperienceLevel


    @IsOptional()
    @Transform(({value}) => value.toUpperCase())
    @IsEnum(JobStatus)
    status?: JobStatus  

    @IsOptional()
    @IsDateString()
    expiresAt?: Date
}