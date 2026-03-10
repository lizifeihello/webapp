import type { Firestore } from 'firebase-admin/firestore';
export declare class TodosService {
    private readonly db;
    constructor(db: Firestore);
    private col;
    list(): Promise<{
        id: string;
    }[]>;
    create(title: string): Promise<{
        title: string;
        done: boolean;
        createdAt: string;
        id: string;
    }>;
    update(id: string, patch: {
        title?: string;
        done?: boolean;
    }): Promise<{
        id: string;
    }>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
