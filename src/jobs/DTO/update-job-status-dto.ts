import { IsNotEmpty,IsEnum } from "class-validator";
import { Transform } from "class-transformer";
import { JobStatus } from "@prisma/client";

export class UpdateStatus {
    @IsNotEmpty()
    @IsEnum(JobStatus)
    @Transform(({value}) => value.toUpperCase())
    status: JobStatus 
}