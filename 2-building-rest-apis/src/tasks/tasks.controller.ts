import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { Connection } from 'src/common/constants/connection';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller({
  path: 'tasks',
  scope: Scope.REQUEST,
})
export class TasksController {
  constructor(
    private tasksService: TasksService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log(
      `THIS IS CONNECTION STRING ${this.connection.CONNECTION_STRING}`,
    );
  }

  @Post()
  create(@Body() CreateTaskDto: CreateTaskDto) {
    const results = this.tasksService.createTask(CreateTaskDto);
    return results;
  }

  @Get()
  getAll() {
    try {
      return this.tasksService.getAllTasks();
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Get(':id')
  getOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    return this.tasksService.getOneTask(id);
  }

  @Put(':id')
  update() {
    return this.tasksService.updateTask(1, 'Task 1 updated');
  }

  @Delete(':id')
  remove() {
    return this.tasksService.deleteTask(1);
  }
}
