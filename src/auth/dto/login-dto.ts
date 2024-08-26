import { IsString, IsEmail, MinLength, Matches } from 'class-validator';


export class LoginUserDto {
    @IsString() 
    @IsEmail()

    email: string;
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,{message : 'password too weak'})

    password: string;
    
}
