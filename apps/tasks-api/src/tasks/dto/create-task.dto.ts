import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({
        description: 'The title of the task',
        example: 'Task 1',
        required: true,
        type: String,
    })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(6, { message: 'Name must be at least 6 characters long' })
    title: string;

    @ApiProperty({
        description: 'The completed status of the task',
        example: false,
        required: true,
        type: Boolean,
    })
    @IsNotEmpty({ message: 'completed is required' })
    completed: boolean;

    @ApiProperty({
        description: 'The author of the task',
        example: 'authorId',
        required: true,
        type: String,
    })
    @IsString({ message: 'authorId must be a string' })
    @IsNotEmpty({ message: 'authorId is required' })
    authorId: string;

}
