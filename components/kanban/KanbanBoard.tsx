"use client";

import { useState } from "react";
import Column from "./Column";
import { ColumnType } from "./types";

const initialData: ColumnType[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      { id: "1", title: "Create initial project plan" },
      { id: "2", title: "Design landing page" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    cards: [{ id: "3", title: "Implement authentication" }],
  },
  {
    id: "done",
    title: "Done",
    cards: [{ id: "4", title: "Write API documentation" }],
  },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);

  const onDropCard = (
    cardId: string,
    fromColumn: string,
    toColumn: string
  ) => {
    if (fromColumn === toColumn) return;

    setColumns((prev) => {
      const source = prev.find((c) => c.id === fromColumn)!;
      const target = prev.find((c) => c.id === toColumn)!;
      const card = source.cards.find((c) => c.id === cardId)!;

      return prev.map((col) => {
        if (col.id === fromColumn) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== cardId),
          };
        }
        if (col.id === toColumn) {
          return {
            ...col,
            cards: [...col.cards, card],
          };
        }
        return col;
      });
    });
  };

  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          setColumns={setColumns}
          onDropCard={onDropCard}
        />
      ))}
    </div>
  );
}
