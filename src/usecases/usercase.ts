export interface Usecase<Request = any, Response = any> {
  run(args: Request): Promise<Response>;
}