import { ID, TodoStatus } from "./todo-types";

export class Todo {
  constructor(
    public readonly id: ID,
    public readonly title: string,
    public readonly description: string,
    public readonly status: TodoStatus,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date
  ) { }
}