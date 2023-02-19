import { Todo } from '@entities/todo.entity'

export const buildFakeTodo = (): Todo => {
  return {
    id: 'some_id',
    title: 'some title',
    description: 'some description',
    status: 'Todo',
    createdAt: new Date()
  };
}

