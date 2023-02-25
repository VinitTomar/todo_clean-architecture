import { ID } from "@entities/todo-types";
import { Todo } from "@entities/todo.entity";
import { TodoRepository } from "./todo-repository";

export class InMmTodoRepository implements TodoRepository {

  constructor(
    private todos: Todo[] = []
  ) { }

  async findById(id: ID): Promise<Todo | void> {
    const todo = this.todos.find(td => td.id === id);
    return todo;
  }

}