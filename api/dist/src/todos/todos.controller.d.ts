import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';
export declare class TodosController {
    private readonly todos;
    constructor(todos: TodosService);
    list(): import("./todo.types").Todo[];
    create(dto: CreateTodoDto): import("./todo.types").Todo;
    update(id: string, dto: UpdateTodoDto): import("./todo.types").Todo;
    remove(id: string): {
        ok: true;
    };
}
