import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        ...createTaskDto,
      },
    });
    return task;
  }

  async findAll() {
    const tasks = await this.prisma.task.findMany();
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
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
}
