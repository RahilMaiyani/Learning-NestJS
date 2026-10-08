import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "Title must be at least 3 characters long" })
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}