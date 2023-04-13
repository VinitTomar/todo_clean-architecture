import { CreateTodoValidator as UsecaseValidator } from "@usecases/create-todo";
import { CreateTodoValidator } from "@infra/validators/create-todo.validator";


export class ValidatorFactory {
  private static createTodoValidator: UsecaseValidator;

  static buildCreateTodoValidator(): UsecaseValidator {
    if (!this.createTodoValidator) {
      this.createTodoValidator = new CreateTodoValidator();
    }

    return this.createTodoValidator;
  }
}