import { IsOptional,MinLength,MaxLength,IsString,IsNumber, IsEmail } from "class-validator";

export class UpdateCompanyDto {
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    name?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @MinLength(10)
    @MaxLength(30)
    @IsString()
    phone?: string

    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    slug?: string

    @IsOptional()
    @IsString()
    @MinLength(20)
    @MaxLength(1000)
    description?: string

    @IsOptional()
    @IsString()
    website?: string

    @IsOptional()
    @IsString()
    industry?: string

    @IsOptional()
    @IsString()
    companySize?: string

    @IsOptional()
    @IsNumber()
    foundedYear?: number

    @IsOptional()
    socialLinks?: string

    @IsOptional()
    benefits?: string[]


    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    culture?: string

    @IsOptional()
    @IsString()
    headquarters?: string


}