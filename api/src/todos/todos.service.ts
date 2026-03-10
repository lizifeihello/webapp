import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Firestore } from 'firebase-admin/firestore';
import { FIRESTORE } from '../common/firebasestore/firestore.provider';

@Injectable()
export class TodosService {
  constructor(@Inject(FIRESTORE) private readonly db: Firestore) {}

  private col() {
    return this.db.collection('todos');
  }

  async list() {
    const snap = await this.col().orderBy('createdAt', 'desc').get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  async create(title: string) {
    const doc = {
      title,
      done: false,
      createdAt: new Date().toISOString(),
    };
    const ref = await this.col().add(doc);
    return { id: ref.id, ...doc };
  }

  async update(id: string, patch: { title?: string; done?: boolean }) {
    const ref = this.col().doc(id);
    const cur = await ref.get();
    if (!cur.exists) throw new NotFoundException(`Todo not found: ${id}`);

    await ref.update(patch);
    const next = await ref.get();
    return { id: next.id, ...next.data() };
  }

  async remove(id: string) {
    await this.col().doc(id).delete();
    return { ok: true };
  }
}