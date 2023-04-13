import { Todo } from "@entities/todo.entity";
import { TodoRepository } from "@infra/db/todo-repository"
import { InMmTodoRepository } from "@infra/db/in-mm-todo-repository"
import { buildFakeTodo } from "../../entities/mocks/todo.entity";


describe('Todo repository test', () => {
  it('should create repository with "findById" method', () => {
    const repo: TodoRepository = new InMmTodoRepository();

    expect(repo.findById).toBeDefined();
  });

  it('should create repository with "persist" method', () => {
    const repo: TodoRepository = new InMmTodoRepository();

    expect(repo.persist).toBeDefined();
  });

  it('should save Todo to reposioty\'s todo list', async () => {
    const todo: Todo = buildFakeTodo();

    const repo: TodoRepository = new InMmTodoRepository();

    await repo.persist(todo);

    const getTodo = await repo.findById(todo.id);

    expect(getTodo).toEqual(todo);
  });
});