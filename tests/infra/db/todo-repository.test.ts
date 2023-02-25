import { TodoRepository } from "@infra/db/todo-repository"
import { InMmTodoRepository } from "@infra/db/in-mm-todo-repository"


describe('Todo repository test', () => {
  it('should create repository with "findById" method', () => {
    const repo: TodoRepository = new InMmTodoRepository();

    expect(repo.findById).toBeDefined();
  });
});