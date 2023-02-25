import { GetTodoByIdController } from "@controllers/get-todo-by-id.controller";
import { UsecaseFactory } from "@main/factories/usecase.factory";


export class ControllerFactory {
  private static getTodoByIdControler: GetTodoByIdController;

  static buildGetTodoByIdController(): GetTodoByIdController {
    if (!this.getTodoByIdControler) {
      this.getTodoByIdControler = new GetTodoByIdController(
        UsecaseFactory.buildGetTodoByIdUsecase()
      );
    }

    return this.getTodoByIdControler;
  }

}