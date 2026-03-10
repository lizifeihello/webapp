import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Todo } from './todo.types';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    private todos: Todo[] = [];

    list(): Todo[] {
        return [...this.todos].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }

    create(createTodoDto: CreateTodoDto): Todo {
        const newTodo: Todo = {
            id: randomUUID(),
            title: createTodoDto.title,
            done: false,
            createdAt: new Date().toISOString(),
        }
        this.todos.push(newTodo);
        return newTodo;
    }

    update(id: string, dto: UpdateTodoDto): Todo {
        const t = this.todos.find((x) => x.id === id);
        if (!t) throw new NotFoundException(`Todo not found: ${id}`);

        if (dto.title !== undefined) t.title = dto.title;
        if (dto.done !== undefined) t.done = dto.done;

        return t;
    }

    remove(id: string): { ok: true } {
        const idx = this.todos.findIndex((x) => x.id === id);
        if (idx === -1) throw new NotFoundException(`Todo not found: ${id}`);
        this.todos.splice(idx, 1);
        return { ok: true };
    }
}
