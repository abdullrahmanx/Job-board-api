import { IsOptional,IsNotEmpty,MinLength,IsDateString,IsEnum, MaxLength,Min,IsString,IsNumber } from "class-validator";  
import { Transform } from "class-transformer";
import { JobType,ExperienceLevel,JobStatus } from "@prisma/client";
export class UpdateJobDto {

    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(40)
    title?: string

    @IsOptional()
    @IsString()
    @MinLength(10)
    @MaxLength(2000)
    description?: string

    @IsOptional()
    @IsString()
    @MinLength(10)
    location?: string

    @IsOptional()
    @IsNumber()
    @Min(1)
    salary?: number

    @IsOptional()
    @IsNumber()
    salaryMax?: number

    @IsOptional()
    @IsString()
    currency?: string

    @IsOptional()
    @Transform(({value}) => value.toUpperCase())
    @IsEnum(JobType)
    type?: JobType 

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