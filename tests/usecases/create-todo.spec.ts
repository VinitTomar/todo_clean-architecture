import { CreateTodoCommand, CreateTodoRepository, CreateTodoRequest, CreateTodoUsecase, CreateTodoValidator, InvalidCreateTodoError } from "@usecases/create-todo";
import { TodoStatus } from "@entities/todo-types";


describe('Create todo test', () => {

  const validator: CreateTodoValidator = {
    validate: jest.fn()
  };

  const validateSpy = jest.spyOn(validator, 'validate');

  const repository: CreateTodoRepository = {
    persist: jest.fn()
  }

  const persistSpy = jest.spyOn(repository, 'persist');

  let usecases: CreateTodoUsecase;

  beforeEach(() => {
    validateSpy.mockReset();
    persistSpy.mockReset();
    usecases = new CreateTodoCommand(validator, repository);
  });

  it('Should throw validation error for invalid input', async () => {
    validateSpy.mockResolvedValueOnce({
      title: 'title not found',
      description: 'description not found'
    });

    const t = async () => {
      await usecases.run({ title: '', description: '' });
    }

    await expect(t()).rejects.toThrowError(InvalidCreateTodoError);
    expect(persistSpy).not.toHaveBeenCalled();
  });

  it('Should call repository with correct Todo params', async () => {
    const createTodo: CreateTodoRequest = {
      title: 'Todo title',
      description: 'Todo description'
    };

    await usecases.run(createTodo);

    expect(persistSpy).toHaveBeenCalledWith({
      ...createTodo,
      id: expect.any(String),
      status: TodoStatus.TODO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

  });

  it('Should return a Todo for valid params', async () => {
    const createTodo: CreateTodoRequest = {
      title: 'Todo title',
      description: 'Todo description'
    };

    const todo = await usecases.run(createTodo);

    expect(todo).toMatchObject({
      ...createTodo,
      id: expect.any(String),
      status: TodoStatus.TODO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

});