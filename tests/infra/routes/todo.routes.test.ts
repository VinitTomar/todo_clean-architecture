import { GetTodoByIdController } from "@controllers/get-todo-by-id.controller";
import { HttpMethods } from "@infra/interfaces/http-routes";
import { TodoRoutes } from "@infra/routes/todo.routes";

describe('Todo routes test', () => {
  const expectedRoutes = [
    { path: '/todo/:id', method: HttpMethods.GET, controller: GetTodoByIdController }
  ]

  it.each(expectedRoutes)('Should have correct controller for path: "$path"', expectedRoute => {
    const route = TodoRoutes.getRoutes().filter(rt => rt.path === expectedRoute.path);

    expect(route.length).toBe(1);

    expect(route[0]).toEqual(expectedRoute);

  });
})