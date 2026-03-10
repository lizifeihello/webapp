export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
};

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    // 尝试读 NestJS 的错误 JSON
    let msg = `${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      msg = data?.message ? String(data.message) : msg;
    } catch {}
    throw new Error(msg);
  }

  // DELETE 可能没有 body，这里简单处理
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export const TodosApi = {
  list: () => http<Todo[]>("/api/todos"),
  create: (title: string) => http<Todo>("/api/todos", { method: "POST", body: JSON.stringify({ title }) }),
  update: (id: string, patch: Partial<Pick<Todo, "title" | "done">>) =>
    http<Todo>(`/api/todos/${id}`, { method: "PATCH", body: JSON.stringify(patch) }),
  remove: (id: string) => http<{ ok: true }>(`/api/todos/${id}`, { method: "DELETE" }),
};