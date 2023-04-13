import Joi from 'joi';
import { CreateTodoRequest, CreateTodoValidator as UsecaseValidator } from "@usecases/create-todo";
import { ErrorMap } from "@usecases/error-map";

export class CreateTodoValidator implements UsecaseValidator {

  private schema: Joi.ObjectSchema<CreateTodoRequest> = Joi.object({
    title: Joi.string().not().empty().min(3).max(50).required(),
    description: Joi.string().not().empty().min(3).max(500).required(),
  });

  private parseError(error: Joi.ValidationError): ErrorMap<CreateTodoRequest> {
    return error.details.reduce((prev: any, curr: any) => {
      return {
        ...prev,
        [curr.path.join()]: curr.message
      }
    }, {});
  }

  async validate(param: CreateTodoRequest): Promise<void | ErrorMap<CreateTodoRequest>> {
    const { error } = this.schema.validate(param, { abortEarly: false });

    if (error) {
      return this.parseError(error);
    }
  }
}