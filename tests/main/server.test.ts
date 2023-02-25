import { Express } from 'express';
import { ExpressAppServer } from "@main/server";
import request from 'supertest';

describe('Test server', () => {
  let app: Express;

  beforeEach(() => {
    app = ExpressAppServer.setup();
  });

  it('should get a todo with ID 123', async () => {
    const result = request(app).get('/todo/123').expect(200);
    expect(result).toEqual({
      payload: {
        id: '123',
        title: 'Some title',
        description: 'Some description',
        status: 'In-progress',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }
    });
  });
});