import { Todo } from './todo.types';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodosService {
    private todos;
    list(): Todo[];
    create(createTodoDto: CreateTodoDto): Todo;
    update(id: string, dto: UpdateTodoDto): Todo;
    remove(id: string): {
        ok: true;
    };
}
