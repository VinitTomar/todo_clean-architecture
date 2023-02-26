import { Todo } from "@entities/todo.entity";
import { CreateTodoRequest, CreateTodoUsecase, InvalidCreateTodoError } from "@usecases/create-todo";
import { Controller, ControllerRequest, ControllerResponse } from "@controllers/controller";

export interface CreateTodoControllerRequest extends ControllerRequest<CreateTodoRequest, undefined, undefined> { }

export interface CreateTodoControllerResponse extends ControllerResponse<Todo> { }

export class CreateTodoController implements Controller<
  CreateTodoControllerRequest, CreateTodoControllerResponse
> {

  constructor(
    private usecase: CreateTodoUsecase
  ) { }

  async handle(req: CreateTodoControllerRequest): Promise<CreateTodoControllerResponse> {
    try {
      const todo = await this.usecase.run(req.body);

      return {
        status: 200,
        payload: todo
      };

    } catch (error) {
      if (error instanceof InvalidCreateTodoError) {
        return {
          status: 400,
          error: {
            ...error.errors
          }
        };
      }

      throw error;
    }
  }

}