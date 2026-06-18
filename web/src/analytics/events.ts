import { pushDataLayer } from "./gtm";

export function trackTodoCreate(params: {
    todoId?: string;
    todoCount?: number;
}) {
    pushDataLayer({
        event: "todo_create",
        item_type: "todo",
        todo_id: params.todoCount,
    });
}

export function trackTodoToggle(params: {
    todoId: string;
    done: boolean;
}) {
    pushDataLayer({
        event: "todo_toggle",
        item_type: "todo",
        todo_id: params.todoId,
        done: params.done,
    });
}

export function trackTodoDelete(params: {
    todoId: string;
}) {
    pushDataLayer({
        event: "todo_delete",
        item_type: "todo",
        todo_id: params.todoId,
    });
}

export function trackBtn(params: {
    event: string;
    value1?: string;
    value2?: string;
}) {
    pushDataLayer({
        event: params.event,
        value1: params.value1 || "value1",
        value2: params.value2 || "value2",
    });
}