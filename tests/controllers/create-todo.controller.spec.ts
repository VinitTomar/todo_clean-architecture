import { TodoStatus } from "@entities/todo-types";
import { CreateTodoUsecase, InvalidCreateTodoError } from "@usecases/create-todo";
import { CreateTodoController } from "@controllers/create-todo.controller";

describe('Create Todo controller terst', () => {
  let controller: CreateTodoController;

  const usecase: CreateTodoUsecase = {
    run: jest.fn()
  };
  const usecaseRunSpy = jest.spyOn(usecase, 'run');

  beforeEach(() => {
    usecaseRunSpy.mockReset();
    controller = new CreateTodoController(usecase);
  })


  it('Should return response with 400 status & errors when usecase throws InvalidCreateTodoError', async () => {

    const errors = {
      title: 'title not found',
      description: 'description not found'
    };

    usecaseRunSpy.mockRejectedValueOnce(new InvalidCreateTodoError(errors));

    const response = await controller.handle({
      body: {
        title: '',
        description: ''
      },
      pathParams: undefined,
      queryParams: undefined
    });

    expect(response).toEqual({
      status: 400,
      error: errors
    });
  });

  it('Should call CreateTodoUsecase with correct params', async () => {
    const createTodo = {
      title: 'Todo titile',
      description: 'Todo description'
    };

    await controller.handle({
      body: createTodo,
      pathParams: undefined,
      queryParams: undefined
    });

    expect(usecaseRunSpy).toHaveBeenCalledWith(createTodo)
  });

  it('Should return response with new Todo & 200 status when usecase does not throw any error', async () => {
    const createTodo = {
      title: 'Todo titile',
      description: 'Todo description'
    };

    const todo = {
      id: '1234',
      ...createTodo,
      status: TodoStatus.TODO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    };

    usecaseRunSpy.mockResolvedValueOnce(todo);

    const response = await controller.handle({
      body: createTodo,
      pathParams: undefined,
      queryParams: undefined
    });

    expect(response).toEqual({
      status: 200,
      payload: todo
    });
  });
});