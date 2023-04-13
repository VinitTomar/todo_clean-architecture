import { GetTodoByIdQuery, GetTodoByIdUsecase } from "@usecases/get-todo-by-id";
import { CreateTodoCommand, CreateTodoUsecase } from "@usecases/create-todo";
import { RepositoryFactory } from "@main/factories/repository.factory";
import { ValidatorFactory } from "@main/factories/validator.factory";

export class UsecaseFactory {

  private static getTodoByIdUsecase: GetTodoByIdUsecase;
  private static createTodoUsecase: CreateTodoUsecase;

  static buildGetTodoByIdUsecase(): GetTodoByIdUsecase {
    if (!this.getTodoByIdUsecase) {
      this.getTodoByIdUsecase = new GetTodoByIdQuery(
        RepositoryFactory.buildInMmTodoRepository()
      );
    }

    return this.getTodoByIdUsecase;
  }

  static buildCreateTodoUsecase(): CreateTodoUsecase {
    if (!this.createTodoUsecase) {
      this.createTodoUsecase = new CreateTodoCommand(
        ValidatorFactory.buildCreateTodoValidator(),
        RepositoryFactory.buildInMmTodoRepository()
      );
    }

    return this.createTodoUsecase;
  }

}