import { IsEmail, IsString, Matches,MinLength} from "class-validator";

export class CreateUserDto {
    @IsString() 
    @IsEmail()

    email: string;
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,{message : 'password too weak'})

    password: string;
    @IsString()
    @MinLength(3)
    fullname: string;
}
