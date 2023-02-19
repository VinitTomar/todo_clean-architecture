import { Todo } from "@entities/todo.entity";
import { buildFakeTodo } from "./mocks/todo.entity";

describe('Todo entity tests', () => {
  let todo: Todo;

  beforeEach(() => {
    todo = buildFakeTodo();
  })

  it('should be Todo entity', () => {
    const keys = Object.keys(todo).sort();
    const expectedKeys = [
      'id',
      'title',
      'description',
      'status',
      'createdAt',
    ].sort();


    expect(expectedKeys).toEqual(keys);
  });
});