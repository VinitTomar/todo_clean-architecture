import { Router } from "express";
import { BaseRoutes } from "@main/routes/base.routes";
import { HttpMethods } from "@infra/interfaces/http-routes";
import { ControllerFactory } from "@main/factories/controller.factory";

export class Routes extends BaseRoutes {
  static getTodoRouter() {

    const router = Router();
    const routes = [
      { path: '/todo/', method: HttpMethods.POST, controller: ControllerFactory.buildCreateTodoController() },
      { path: '/todo/:id', method: HttpMethods.GET, controller: ControllerFactory.buildGetTodoByIdController() }
    ]

    routes.forEach(({ path, method, controller }) => {
      switch (method) {
        case HttpMethods.GET:
          router.get(
            path,
            this.routeWrapper(
              controller
            )
          )
          break;
      }
    });

    return router;

  }
}