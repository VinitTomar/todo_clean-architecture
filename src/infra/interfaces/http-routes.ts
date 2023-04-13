import { Usecase } from "@usecases/usercase";
import { Controller } from "@controllers/controller";

export enum HttpMethods {
  GET,
  PUT,
  POST,
  DELETE
}

export type HttpController = (new (usecase: Usecase) => Controller);

export interface HttpRoute {
  path: string;
  method: HttpMethods,
  controller: HttpController
}

export type HttpRoutes = HttpRoute[];