import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;
}