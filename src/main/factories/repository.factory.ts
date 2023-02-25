import { InMmTodoRepository } from "@infra/db/in-mm-todo-repository";
import { TodoRepository } from "@infra/db/todo-repository";

export class RepositoryFactory {
  private static inMmrepository: InMmTodoRepository;

  static buildInMmTodoRepository(): TodoRepository {
    if (!this.inMmrepository) {
      this.inMmrepository = new InMmTodoRepository([
        {
          id: '123',
          title: 'Some title',
          description: 'Some description',
          status: 'In-progress',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    }

    return this.inMmrepository;
  }

}