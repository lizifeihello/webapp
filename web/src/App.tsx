import { TodosPage } from "./modules/todos/pages/TodoPage";
import { BtnPage } from "./modules/todos/pages/BtnPage";

export default function App() {
  const isBtnPage = window.location.pathname === "/btn";

  return (
    <>
      <nav style={{ maxWidth: 680, margin: "16px auto 0", padding: "0 16px", fontFamily: "system-ui" }}>
        <a href="/" style={{ marginRight: 12 }}>
          Todo
        </a>
        <a href="/btn">BtnPage</a>
      </nav>
      {isBtnPage ? <BtnPage /> : <TodosPage />}
    </>
  );
}
