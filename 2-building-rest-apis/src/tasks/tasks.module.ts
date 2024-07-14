import { Module } from '@nestjs/common';
import { connection } from 'src/common/constants/connection';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class TasksModule {}
