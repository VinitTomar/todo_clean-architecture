import { ID, TodoStatus } from "./todo-types";

export class Todo {
  constructor(
    public id: ID,
    public title: string,
    public description: string,
    public status: TodoStatus,
    public createdAt: Date,
    public updatedAt?: Date
  ) { }
}