export interface ControllerRequest<Tbody = any, Tparam = any, Tquery = any> {
  body: Tbody;
  pathParams: Tparam;
  queryParams: Tquery;
}

export interface ControllerResponse<T = any> {
  status: number;
  payload?: T;
  error?: {
    [k: string]: string
  }
}

export interface Controller<
  T extends ControllerRequest = ControllerRequest,
  R extends ControllerResponse = ControllerResponse
> {
  handle(req: T): Promise<R>;
}