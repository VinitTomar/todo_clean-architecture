import { GetTodoByIdController } from "@controllers/get-todo-by-id.controller";
import { CreateTodoController } from "@controllers/create-todo.controller";
import { UsecaseFactory } from "@main/factories/usecase.factory";

export class ControllerFactory {
  private static getTodoByIdController: GetTodoByIdController;
  private static createTodoController: CreateTodoController

  static buildGetTodoByIdController(): GetTodoByIdController {
    if (!this.getTodoByIdController) {
      this.getTodoByIdController = new GetTodoByIdController(
        UsecaseFactory.buildGetTodoByIdUsecase()
      );
    }

    return this.getTodoByIdController;
  }

  static buildCreateTodoController(): CreateTodoController {
    if (!this.createTodoController) {
      this.createTodoController = new CreateTodoController(
        UsecaseFactory.buildCreateTodoUsecase()
      );
    }

    return this.createTodoController;
  }

}