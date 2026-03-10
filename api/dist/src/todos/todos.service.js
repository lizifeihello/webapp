"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let TodosService = class TodosService {
    todos = [];
    list() {
        return [...this.todos].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    create(createTodoDto) {
        const newTodo = {
            id: (0, crypto_1.randomUUID)(),
            title: createTodoDto.title,
            done: false,
            createdAt: new Date().toISOString(),
        };
        this.todos.push(newTodo);
        return newTodo;
    }
    update(id, dto) {
        const t = this.todos.find((x) => x.id === id);
        if (!t)
            throw new common_1.NotFoundException(`Todo not found: ${id}`);
        if (dto.title !== undefined)
            t.title = dto.title;
        if (dto.done !== undefined)
            t.done = dto.done;
        return t;
    }
    remove(id) {
        const idx = this.todos.findIndex((x) => x.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException(`Todo not found: ${id}`);
        this.todos.splice(idx, 1);
        return { ok: true };
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)()
], TodosService);
//# sourceMappingURL=todos.service.js.map