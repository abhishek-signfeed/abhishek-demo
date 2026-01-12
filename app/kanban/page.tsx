import KanbanBoard from "@/components/kanban/KanbanBoard";
import "@/styles/kanban.css";

export default function KanbanPage() {
  return (
    <main style={{ padding: 20 }}>
      <h2>Kanban Board</h2>
      <KanbanBoard />
    </main>
  );
}
