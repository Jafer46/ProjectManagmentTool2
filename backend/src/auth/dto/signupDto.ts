import { IsEmail, IsString, MinLength } from "class-validator"

export class SignupDTO {
    @IsString()
    username: string

    @IsEmail()
    email : string

    @IsString()
    @MinLength(6)
    password : string 
}