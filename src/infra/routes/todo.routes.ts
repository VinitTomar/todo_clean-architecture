import { HttpMethods, HttpRoutes } from "@infra/interfaces/http-routes";
import { GetTodoByIdController } from "@controllers/get-todo-by-id.controller";

export class TodoRoutes {
  static getRoutes(): HttpRoutes {
    return [
      { path: '/todo/:id', method: HttpMethods.GET, controller: GetTodoByIdController }
    ];
  }
}