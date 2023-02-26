import { Todo } from "@entities/todo.entity";
import { TodoStatus } from "@entities/todo-types";
import { Usecase } from "@usecases/usercase";
import { ErrorMap } from "@usecases/error-map";

export type CreateTodoErrors = ErrorMap<CreateTodoRequest>;

export class InvalidCreateTodoError extends Error {
  name = 'InvalidCreateTodoError';

  constructor(
    public errors: CreateTodoErrors
  ) {
    super('Invalid create todo request');
  }
}

export interface CreateTodoRequest extends Pick<Todo, 'title' | 'description'> { }

export interface CreateTodoUsecase extends Usecase<CreateTodoRequest, Todo> { }

export interface CreateTodoValidator {
  validate(param: CreateTodoRequest): Promise<CreateTodoErrors | void>;
}

export interface CreateTodoRepository {
  persist(param: Todo): Promise<void>;
}

export class CreateTodoCommand implements CreateTodoUsecase {

  constructor(
    private validator: CreateTodoValidator,
    private repository: CreateTodoRepository,
  ) { }

  async run(param: CreateTodoRequest): Promise<Todo> {

    const errors = await this.validator.validate(param);

    if (errors) {
      throw new InvalidCreateTodoError(errors);
    }

    const todo = new Todo(
      Date.now().toString(),
      param.title,
      param.description,
      TodoStatus.TODO,
      new Date(),
      new Date()
    );

    await this.repository.persist(todo);

    return todo;
  }

}