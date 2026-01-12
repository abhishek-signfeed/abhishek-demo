"use client";

import Card from "./Card";
import { ColumnType } from "./types";

interface Props {
  column: ColumnType;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  onDropCard: (cardId: string, from: string, to: string) => void;
}

export default function Column({ column, setColumns, onDropCard }: Props) {
  return (
    <div
      className="kanban-column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const cardId = e.dataTransfer.getData("cardId");
        const fromColumn = e.dataTransfer.getData("fromColumn");
        onDropCard(cardId, fromColumn, column.id);
      }}
    >
      <h3>{column.title}</h3>

      {column.cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          columnId={column.id}
          setColumns={setColumns}
        />
      ))}

      <button
        onClick={() =>
          setColumns((prev) =>
            prev.map((c) =>
              c.id === column.id
                ? {
                    ...c,
                    cards: [
                      ...c.cards,
                      { id: Date.now().toString(), title: "New Card" },
                    ],
                  }
                : c
            )
          )
        }
      >
        + Add Card
      </button>
    </div>
  );
}
