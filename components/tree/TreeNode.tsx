'use client'
import React, { useState } from "react";
import { TreeNode as NodeType } from "../tree/types";

interface Props {
  node: NodeType;
  onToggle: (id: string) => void;
  onAdd: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
  onDropNode: (dragId: string, targetId: string) => void;
}

export const TreeNode: React.FC<Props> = ({
  node,
  onToggle,
  onAdd,
  onDelete,
  onEdit,
  onDropNode,
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(node.name);

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", node.id)}
      onDrop={(e) => {
        e.preventDefault();
        onDropNode(e.dataTransfer.getData("id"), node.id);
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{ marginLeft: 20 }}
    >
      <div className="node">
        {node.hasChildren && (
          <button onClick={() => onToggle(node.id)}>
            {node.isExpanded ? "−" : "+"}
          </button>
        )}

        {editing ? (
          <input
            value={value}
            autoFocus
            onBlur={() => {
              setEditing(false);
              onEdit(node.id, value);
            }}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span onDoubleClick={() => setEditing(true)}>{node.name}</span>
        )}

        <button onClick={() => onAdd(node.id)}>+</button>
        <button
          onClick={() => {
            if (window.confirm("Delete this node and its children?"))
              onDelete(node.id);
          }}
        >
          🗑
        </button>
      </div>

      {node.isLoading && <div>Loading...</div>}

      {node.isExpanded &&
        node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            {...{ onToggle, onAdd, onDelete, onEdit, onDropNode }}
          />
        ))}
    </div>
  );
};
