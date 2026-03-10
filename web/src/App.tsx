import { useEffect, useMemo, useState } from "react";
import { TodosApi } from "./api/todos";
import { type Todo } from "./api/todos";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>("");

  const remaining = useMemo(() => todos.filter((t) => !t.done).length, [todos]);

  const refresh = async () => {
    setErr("");
    const list = await TodosApi.list();
    setTodos(list);
  };

  useEffect(() => {
    refresh().catch((e) => setErr(String(e.message ?? e)));
  }, []);

  const add = async () => {
    const v = title.trim();
    if (!v) return;
    setLoading(true);
    setErr("");
    try {
      await TodosApi.create(v);
      setTitle("");
      await refresh();
    } catch (e: any) {
      setErr(String(e.message ?? e));
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (t: Todo) => {
    setErr("");
    const next = !t.done;
    // 乐观更新
    setTodos((prev) => prev.map((x) => (x.id === t.id ? { ...x, done: next } : x)));
    try {
      await TodosApi.update(t.id, { done: next });
    } catch (e: any) {
      setErr(String(e.message ?? e));
      await refresh();
    }
  };

  const rename = async (t: Todo) => {
    const next = prompt("New title:", t.title);
    if (next === null) return;
    const v = next.trim();
    if (!v) return;

    setErr("");
    try {
      await TodosApi.update(t.id, { title: v });
      await refresh();
    } catch (e: any) {
      setErr(String(e.message ?? e));
    }
  };

  const remove = async (t: Todo) => {
    if (!confirm(`Delete "${t.title}"?`)) return;
    setErr("");
    try {
      await TodosApi.remove(t.id);
      setTodos((prev) => prev.filter((x) => x.id !== t.id));
    } catch (e: any) {
      setErr(String(e.message ?? e));
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: "24px auto", padding: 16, fontFamily: "system-ui" }}>
      <h2>Todo (NestJS + React)</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
          disabled={loading}
        />
        <button onClick={add} disabled={loading} style={{ padding: "10px 14px" }}>
          Add
        </button>
        <button onClick={() => refresh().catch(() => {})} disabled={loading} style={{ padding: "10px 14px" }}>
          Refresh
        </button>
      </div>

      <div style={{ marginBottom: 10, color: "#666" }}>Remaining: {remaining}</div>

      {err && (
        <div style={{ background: "#ffe8e8", padding: 10, borderRadius: 8, marginBottom: 12 }}>
          Error: {err}
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 10,
            }}
          >
            <input type="checkbox" checked={t.done} onChange={() => toggle(t)} />
            <div style={{ flex: 1, textDecoration: t.done ? "line-through" : "none" }}>{t.title}</div>
            <button onClick={() => rename(t)}>Rename</button>
            <button onClick={() => remove(t)}>Delete</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 16, color: "#888", fontSize: 12 }}>
        API: <code>/api/todos</code> &nbsp;|&nbsp; Health: <code>/api/health</code>
      </div>
    </div>
  );
}