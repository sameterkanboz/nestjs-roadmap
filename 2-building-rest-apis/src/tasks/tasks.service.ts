import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class TasksService {
  // Local array to store tasks
  private readonly tasks: CreateTaskDto[] = [];

  // Create a new task and add it to the tasks array
  createTask(task: CreateTaskDto) {
    this.tasks.push({
      id: this.tasks.length + 1,
      title: task.title,
      tags: task.tags,
      dueDate: task.dueDate,
    });
    return this.tasks.slice(-1);
  }

  // Retrieve all tasks
  getAllTasks() {
    if (!this.tasks.length) {
      throw new Error('No tasks found');
    }
    return this.tasks;
  }

  // Retrieve a single task by its index
  getOneTask(id: number) {
    const task = this.tasks[id];
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  // Update a task at a specific index
  updateTask(id: number, task: string) {
    if (!this.tasks[id]) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks[id].title = task;
    return this.tasks;
  }

  // Delete a task at a specific index
  deleteTask(id: number) {
    if (!this.tasks[id]) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks.splice(id, 1);
    return this.tasks;
  }
}
