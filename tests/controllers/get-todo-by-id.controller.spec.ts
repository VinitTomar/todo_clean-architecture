import { ID } from "@entities/todo-types";
import { Todo } from "@entities/todo.entity";
import { GetTodoByIdUsecase, TodoNotFoundException } from "@usecases/get-todo-by-id";
import { GetTodoByIdController } from "@controllers/get-todo-by-id.controller";
import { buildFakeTodo } from "@tests/entities/mocks/todo.entity";

class GetTodoByIdQuery implements GetTodoByIdUsecase {
  async run(args: ID): Promise<Todo> {
    if (args === '1234')
      return buildFakeTodo();

    throw new TodoNotFoundException(`Todo not found for id = ${args}`);
  }
}

describe('Get todo by id controller tests', () => {
  let useCase: GetTodoByIdQuery;
  let controller: GetTodoByIdController;

  beforeEach(() => {
    useCase = new GetTodoByIdQuery();
    controller = new GetTodoByIdController(useCase);
  });

  it('should call usecase with correct request', async () => {
    const id = '1234';
    const spy = jest.spyOn(useCase, 'run');
    await controller.handle({
      body: null,
      pathParams: { id },
      queryParams: null
    });

    expect(spy).toHaveBeenCalledWith(id);
  });

  it('should return response with status 400 when TodoNotFoundException occurs', async () => {
    const id = '11234';

    const resposne = await controller.handle({
      body: null,
      pathParams: { id },
      queryParams: null
    });

    expect(resposne).toEqual({
      status: 400,
      error: {
        msg: `Todo not found for id = ${id}`
      }
    });
  });

  it('should return response with status 200 when Todo is found', async () => {
    const id = '1234';

    const resposne = await controller.handle({
      body: null,
      pathParams: { id },
      queryParams: null
    });

    const expectedTodo = buildFakeTodo();

    expect(resposne).toEqual({
      status: 200,
      payload: {
        ...expectedTodo,
        createdAt: expect.any(Date)
      }
    });
  });


}); 