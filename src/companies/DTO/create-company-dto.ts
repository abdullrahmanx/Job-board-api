import { IsNotEmpty,IsOptional,MinLength,MaxLength,IsString,IsNumber, IsEmail, IsJSON } from "class-validator";

export class CreateCompanydDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    name: string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    slug: string

    @IsNotEmpty()
    @IsString()
    @MinLength(20)
    @MaxLength(1000)
    description: string

    

    @IsOptional()
    @IsString()
    website?: string

    @IsNotEmpty()
    @IsString()
    industry: string

    @IsOptional()
    @IsString()
    companySize?: string

    @IsOptional()
    @IsNumber()
    foundedYear?: number

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @MinLength(10)
    @MaxLength(30)
    @IsString()
    phone?: string

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