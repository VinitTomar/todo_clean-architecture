import { Usecase } from "@usecases/usercase";
import { Controller } from "@controllers/controller";

export enum HttpMethods {
  GET,
  PUT,
  POST,
  DELETE
}

export interface HttpRoute {
  path: string;
  method: HttpMethods,
  controller: (new (usecase: Usecase) => Controller)
}

export type HttpRoutes = HttpRoute[];