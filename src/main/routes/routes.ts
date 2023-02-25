import { Router } from "express";
import { BaseRoutes } from "@main/routes/base.routes";
import { TodoRoutes } from "@infra/routes/todo.routes";
import { HttpMethods } from "@infra/interfaces/http-routes";
import { ControllerFactory } from "@main/factories/controller.factory";

export class Routes extends BaseRoutes {
  static getTodoRouter() {
    const router = Router();
    const routes = TodoRoutes.getRoutes();

    routes.forEach(route => {
      switch (route.method) {
        case HttpMethods.GET:
          router.get(
            route.path,
            this.routeWrapper(
              ControllerFactory.buildGetTodoByIdController()
            )
          )
          break;
      }
    });

    return router;

  }
}