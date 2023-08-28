import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  // Передаем как параметр нашу таблицу Todo. Таким образом говорим с какой таблицей будет работать SequelizeModule
  imports: [SequelizeModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
