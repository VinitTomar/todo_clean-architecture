import { GetTodoByIdRepository } from "@usecases/get-todo-by-id";
import { CreateTodoRepository } from "@usecases/create-todo";

export interface TodoRepository extends GetTodoByIdRepository, CreateTodoRepository { }