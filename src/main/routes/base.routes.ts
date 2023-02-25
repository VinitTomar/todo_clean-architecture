import { Controller, ControllerRequest, ControllerResponse, } from "@controllers/controller";
import { Request, Response } from "express";

export class BaseRoutes {
  public static routeWrapper(
    controller: Controller<ControllerRequest, ControllerResponse>
  ) {
    return async (req: Request, res: Response) => {
      const controllerRequest: ControllerRequest = {
        body: req.body,
        pathParams: req.params,
        queryParams: req.query
      };

      try {
        const {
          status,
          payload,
          error
        } = await controller.handle(controllerRequest);

        if (status >= 200 && status < 300) {
          res.status(status).json(payload);
        } else if (status >= 400 && status < 500) {
          res.status(status).json(error);
        }
      } catch (error) {
        res.status(500).send('Something went wrong. Please try after sometime.')
      }

    }
  }
}