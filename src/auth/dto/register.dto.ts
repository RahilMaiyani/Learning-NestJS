import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail({}, { message: "Plaese provide a valid email address." })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    @IsIn(['admin', 'user'])
    role?: string;
}