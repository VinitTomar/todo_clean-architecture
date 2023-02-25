import { ID } from "@entities/todo-types";
import { Todo } from "@entities/todo.entity";
import { Usecase } from "@usecases/usercase";
import { GetTodoByIdQuery, GetTodoByIdUsecase } from "@usecases/get-todo-by-id";
import { RepositoryFactory } from "@main/factories/repository.factory";

export class UsecaseFactory {

  private static getTodoByIdUsecase: GetTodoByIdUsecase;

  static buildGetTodoByIdUsecase(): Usecase<ID, Todo> {
    if (!this.getTodoByIdUsecase) {
      this.getTodoByIdUsecase = new GetTodoByIdQuery(
        RepositoryFactory.buildInMmTodoRepository()
      );
    }

    return this.getTodoByIdUsecase;
  }

}