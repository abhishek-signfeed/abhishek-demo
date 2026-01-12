import { TreeView } from "@/components/tree/TreeView";
import "@/styles/tree.css";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h2>Tree View</h2>
      <TreeView />
    </main>
  );
}
