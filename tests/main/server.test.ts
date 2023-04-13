import { TodoStatus } from '@entities/todo-types';
import { Express } from 'express';
import request from 'supertest';
import { RepositoryFactory } from '@main/factories/repository.factory';
import { ExpressAppServer } from "@main/server";

describe('Test server', () => {
  let app: Express;
  let repositorySpy = jest.spyOn(RepositoryFactory.buildInMmTodoRepository(), 'findById');

  beforeEach(() => {
    app = ExpressAppServer.setup();
    repositorySpy.mockReset();
  });

  it('should get a todo with ID 123', async () => {
    repositorySpy.mockResolvedValueOnce(
      {
        id: '123',
        title: 'Some title',
        description: 'Some description',
        status: TodoStatus.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

    const { body: result } = await request(app).get('/todo/123').expect(200);
    expect(result).toMatchObject({
      id: '123',
      title: 'Some title',
      description: 'Some description',
      status: 'In-progress',
    });
  });

  it('should return error response if Todo not found', async () => {
    repositorySpy.mockResolvedValueOnce();
    const todoId = '1234'
    const { body: result } = await request(app).get('/todo/' + todoId).expect(400);
    expect(result).toMatchObject({
      msg: "Todo not found for id = " + todoId
    });
  });
});