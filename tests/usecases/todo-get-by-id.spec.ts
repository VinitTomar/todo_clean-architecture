import { GetTodoByIdQuery, GetTodoByIdRepository, TodoNotFoundException } from "@usecases/get-todo-by-id";
import { ID } from "@entities/todo-types";
import { Todo } from "@entities/todo.entity";
import { buildFakeTodo } from "@tests/entities/mocks/todo.entity";

class TodoRepository implements GetTodoByIdRepository {
  async findById(id: ID): Promise<Todo | null> {
    return buildFakeTodo();
  }

}

describe('Todo get by id test', () => {
  let repository: TodoRepository;
  let query: GetTodoByIdQuery;

  beforeEach(() => {
    repository = new TodoRepository();
    query = new GetTodoByIdQuery(repository);
  })

  it('should call repository with correct Id', async () => {
    const todoId = '12345';
    const spy = jest.spyOn(repository, 'findById');
    await query.run(todoId);
    expect(spy).toHaveBeenCalledWith(todoId);
  });

  it('should throw TodoNotFoundException when repository return Null', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

    const t = async () => {
      await query.run('abc');
    }

    await expect(t()).rejects.toThrowError(TodoNotFoundException);
  });

  it('should return a single Todo for an Id', async () => {
    const todo = await query.run('todoId');
    const expectedTodo = buildFakeTodo();
    expect(todo).toEqual({
      ...expectedTodo,
      createdAt: expect.any(Date)
    });
  });
});