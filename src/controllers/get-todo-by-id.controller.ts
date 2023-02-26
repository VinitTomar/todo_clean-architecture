import { ID } from "@entities/todo-types";
import { Todo } from "@entities/todo.entity";
import { GetTodoByIdUsecase, TodoNotFoundException } from "@usecases/get-todo-by-id";
import { Controller, ControllerRequest, ControllerResponse } from "@controllers/controller";


export interface GetTodoByIdRequest extends ControllerRequest<null, { id: ID }, null> { }

export interface GetTodoByIdResponse extends ControllerResponse<Todo> { }

export class GetTodoByIdController implements Controller<
  GetTodoByIdRequest, GetTodoByIdResponse
> {

  constructor(
    private usecase: GetTodoByIdUsecase
  ) { }

  async handle(req: GetTodoByIdRequest): Promise<GetTodoByIdResponse> {
    try {
      const todo = await this.usecase.run(req.pathParams.id);

      return {
        status: 200,
        payload: todo
      }
    } catch (error) {

      if (error instanceof TodoNotFoundException) {
        return {
          status: 400,
          error: {
            msg: error.message
          }
        }
      }

      throw error;
    }
  }
}