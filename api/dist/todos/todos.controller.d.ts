import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';
export declare class TodosController {
    private readonly todos;
    constructor(todos: TodosService);
    list(): Promise<{
        id: string;
    }[]>;
    create(dto: CreateTodoDto): Promise<{
        title: string;
        done: boolean;
        createdAt: string;
        id: string;
    }>;
    update(id: string, dto: UpdateTodoDto): Promise<{
        id: string;
    }>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
