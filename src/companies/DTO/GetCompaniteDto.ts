import { IsEmail, IsNumber, IsOptional, IsString,Min } from "class-validator";

export class GetCompaniesDto {

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
    @IsString()
    location?: string

    @IsOptional()
    @IsString()
    companySize?: string;
    
    @IsOptional()
    @IsString()
    slug?: string;


    
    @IsOptional()
    @IsString()
    industry?: string

    @IsOptional()
    @IsEmail()
    email?: string
}