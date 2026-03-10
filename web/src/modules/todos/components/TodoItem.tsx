import type { Todo } from "../model/todo";

export function TodoItem(props: {
  todo: Todo;
  onToggle: () => void;
  onRename: () => void;
  onDelete: () => void;
}) {
  const { todo, onToggle, onRename, onDelete } = props;

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 10,
      }}
    >
      <input type="checkbox" checked={todo.done} onChange={onToggle} />
      <div style={{ flex: 1, textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.title}
      </div>
      <button onClick={onRename}>Rename</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}