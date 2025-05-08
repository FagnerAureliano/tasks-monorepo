import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class ResponseTaskDto extends PartialType(CreateTaskDto) {
    id: number;
    title: string;
    completed: boolean;
    authorId: string; 
}
