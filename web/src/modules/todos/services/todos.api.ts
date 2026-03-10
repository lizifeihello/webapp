import type { Todo } from "../model/todo";

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      msg = data?.message ? String(data.message) : msg;
    } catch {}
    throw new Error(msg);
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export const TodosApi = {
  list: () => http<Todo[]>("/api/todos"),
  create: (title: string) =>
    http<Todo>("/api/todos", { method: "POST", body: JSON.stringify({ title }) }),
  update: (id: string, patch: Partial<Pick<Todo, "title" | "done">>) =>
    http<Todo>(`/api/todos/${id}`, { method: "PATCH", body: JSON.stringify(patch) }),
  remove: (id: string) =>
    http<{ ok: true }>(`/api/todos/${id}`, { method: "DELETE" }),
};