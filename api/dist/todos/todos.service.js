"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const firestore_provider_1 = require("../common/firebasestore/firestore.provider");
let TodosService = class TodosService {
    db;
    constructor(db) {
        this.db = db;
    }
    col() {
        return this.db.collection('todos');
    }
    async list() {
        const snap = await this.col().orderBy('createdAt', 'desc').get();
        return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
    async create(title) {
        const doc = {
            title,
            done: false,
            createdAt: new Date().toISOString(),
        };
        const ref = await this.col().add(doc);
        return { id: ref.id, ...doc };
    }
    async update(id, patch) {
        const ref = this.col().doc(id);
        const cur = await ref.get();
        if (!cur.exists)
            throw new common_1.NotFoundException(`Todo not found: ${id}`);
        await ref.update(patch);
        const next = await ref.get();
        return { id: next.id, ...next.data() };
    }
    async remove(id) {
        await this.col().doc(id).delete();
        return { ok: true };
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(firestore_provider_1.FIRESTORE)),
    __metadata("design:paramtypes", [Function])
], TodosService);
//# sourceMappingURL=todos.service.js.map