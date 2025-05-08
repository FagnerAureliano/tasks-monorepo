import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseTaskDto } from './dto/task-response.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    const task = await this.prisma.task.create({
      data: {
        ...createTaskDto,
      },
    });
    return task;
  }

  async findAll(): Promise<ResponseTaskDto[]> {
    const tasks = await this.prisma.task.findMany();
    return tasks;
  }

  async findOne(id: number): Promise<ResponseTaskDto> {
    const task = await this.prisma.task.findFirst({
      where: {
        id,
      },
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseTaskDto> {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new Error('Task not found');
    }
    const updatedTask = await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        ...updateTaskDto,
      },
    });
    return updatedTask;
  }

  async remove(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new Error('Task not found');
    }
    const deletedTask = await this.prisma.task.delete({
      where: {
        id,
      },
    });
    return deletedTask;
  }

  async findByUserId(userId: string): Promise<ResponseTaskDto[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const tasks = await this.prisma.task.findMany({
      where: {
        authorId: userId,
      },
    });
    return tasks;
  }

  async searchByTitle(title: string): Promise<ResponseTaskDto[]> {
    if (!title?.trim()) {
      return [];
    }
    const tasks = await this.prisma.task.findMany({
      where: {
        title: {
          contains: title.trim(),
          mode: 'insensitive',
        },
      },
    });
    return tasks;
  }
}
