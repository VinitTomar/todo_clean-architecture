import { GetTodoByIdController } from "@controllers/get-todo-by-id.controller";
import { HttpMethods } from "@infra/interfaces/http-routes";
import { CreateTodoController } from "@controllers/create-todo.controller";

describe('Todo routes test', () => {
  // const expectedRoutes = [
  //   { path: '/todo/', method: HttpMethods.POST, controller: CreateTodoController },
  //   { path: '/todo/:id', method: HttpMethods.GET, controller: GetTodoByIdController }
  // ]

  // expectedRoute => {
  //   const route = TodoRoutes.getRoutes().filter(rt => rt.path === expectedRoute.path);

  //   expect(route.length).toBe(1);

  //   expect(route[0]).toEqual(expectedRoute);

  // }

  it.todo('Should have correct controller for path: "$path"');
})