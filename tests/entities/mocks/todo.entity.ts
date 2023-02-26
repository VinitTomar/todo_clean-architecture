import { Todo } from '@entities/todo.entity'
import { TodoStatus } from '@entities/todo-types';

export const buildFakeTodo = (): Todo => {
  return {
    id: 'some_id',
    title: 'some title',
    description: 'some description',
    status: TodoStatus.IN_PROGRESS,
    createdAt: new Date()
  };
}

