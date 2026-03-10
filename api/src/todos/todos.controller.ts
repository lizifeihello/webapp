import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todos: TodosService) { }

    @Get()
    list() {
        return this.todos.list();
    }

    @Post()
    create(@Body() dto: CreateTodoDto) {
        return this.todos.create(dto.title);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
        return this.todos.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todos.remove(id);
    }
}
