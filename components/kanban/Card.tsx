"use client";

import { useState } from "react";
import { CardType, ColumnType } from "./types";

interface Props {
  card: CardType;
  columnId: string;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

export default function Card({ card, columnId, setColumns }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(card.title);

  return (
    <div
      className="kanban-card"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("cardId", card.id);
        e.dataTransfer.setData("fromColumn", columnId);
      }}
    >
      {editing ? (
        <input
          value={value}
          autoFocus
          onBlur={() => {
            setEditing(false);
            setColumns((prev) =>
              prev.map((col) =>
                col.id === columnId
                  ? {
                      ...col,
                      cards: col.cards.map((c) =>
                        c.id === card.id ? { ...c, title: value } : c
                      ),
                    }
                  : col
              )
            );
          }}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <p onDoubleClick={() => setEditing(true)}>{card.title}</p>
      )}

      <button
        onClick={() =>
          setColumns((prev) =>
            prev.map((col) =>
              col.id === columnId
                ? {
                    ...col,
                    cards: col.cards.filter((c) => c.id !== card.id),
                  }
                : col
            )
          )
        }
      >
        🗑
      </button>
    </div>
  );
}
