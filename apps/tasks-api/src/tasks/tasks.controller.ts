import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/strategy/guards/jwt-auth.guard';
import { ResponseTaskDto } from './dto/task-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    if (!createTaskDto) {
      throw new Error('Task is required');
    }
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(): Promise<ResponseTaskDto[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseTaskDto> {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.tasksService.findOne(+id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<ResponseTaskDto[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    return this.tasksService.findByUserId(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<ResponseTaskDto> {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.tasksService.remove(+id);
  }

  @Get('title/:search')
  searchByTitle(@Param('search') title: string): Promise<ResponseTaskDto[]> {
    if (!title) {
      throw new Error('Title is required');
    }
    return this.tasksService.searchByTitle(title);
  }
}
