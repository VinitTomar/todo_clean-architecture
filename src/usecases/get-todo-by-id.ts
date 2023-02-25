import { Todo } from "@entities/todo.entity";
import { ID } from "@entities/todo-types";
import { Usecase } from "./usercase";

export class TodoNotFoundException extends Error {
  name: string;
  constructor(message: string) {
    super(message);
    this.name = 'TodoNotFoundException'
  }
}

export interface GetTodoByIdRepository {
  findById(id: ID): Promise<Todo | void>;
}

export interface GetTodoByIdUsecase extends Usecase<ID, Todo> { }

export class GetTodoByIdQuery implements GetTodoByIdUsecase {

  constructor(
    private readonly repository: GetTodoByIdRepository
  ) { }

  async run(id: ID): Promise<Todo> {
    const todo = await this.repository.findById(id);

    if (!todo) {
      throw new TodoNotFoundException(`Todo not found for id = ${id}`);
    }

    return todo;
  }

}