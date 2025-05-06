import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    
    @ApiProperty({
        description: 'The id of the user', 
        example: '', 
        required: true,
        type: String,
    })
    @IsString({ message: 'Id must be a string' })
    @IsNotEmpty({ message: 'Id is required' }) 
    id: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'user@example.com',
        required: true,
        type: String,
    })
    @IsEmail({}, { message: 'Email must be valid' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsString({ message: 'Email must be a string' })
    email: string;

    @ApiProperty({
        description: 'The full name of the user',
        example: 'John Doe',
        required: true,
        type: String,
    })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    name: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'abc@123',
        required: true,
        type: String,
    })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
