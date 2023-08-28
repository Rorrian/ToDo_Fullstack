import { Table, Model, Column } from 'sequelize-typescript';

// Создаем таблицу
@Table
export class Todo extends Model {
  // С 2 колонками
  @Column
  title: string;

  // передаем в пар-рах дефолтное значение
  @Column({ defaultValue: false })
  done: boolean;
}
