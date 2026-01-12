'use client'
import React, { useState } from "react";
import { TreeNode } from "../tree/types";
import { TreeNode as Node } from "./TreeNode";
import { fetchChildren } from "../../api/mockTreeApi";
import { addChildNode, removeNode, updateNode } from "../tree/utils";

const initialData: TreeNode[] = [
  {
    id: "A",
    name: "Level A",
    hasChildren: true,
  },
];

export const TreeView: React.FC = () => {
  const [tree, setTree] = useState<TreeNode[]>(initialData);

  const toggleNode = async (id: string) => {
    setTree((prev) =>
      updateNode(prev, id, (node) => ({
        ...node,
        isExpanded: !node.isExpanded,
        isLoading: !node.children && node.hasChildren,
      }))
    );

    const target = findNode(tree, id);
    if (target && !target.children && target.hasChildren) {
      const children = await fetchChildren(id);
      setTree((prev) =>
        updateNode(prev, id, (node) => ({
          ...node,
          children,
          isLoading: false,
        }))
      );
    }
  };

  const findNode = (nodes: TreeNode[], id: string): TreeNode | undefined => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
  };

  return (
    <div>
      {tree.map((node) => (
        <Node
          key={node.id}
          node={node}
          onToggle={toggleNode}
          onAdd={(id) =>
            setTree((prev) =>
              addChildNode(prev, id, {
                id: Date.now().toString(),
                name: "New Node",
              })
            )
          }
          onDelete={(id) => setTree((prev) => removeNode(prev, id))}
          onEdit={(id, name) =>
            setTree((prev) =>
              updateNode(prev, id, (node) => ({ ...node, name }))
            )
          }
          onDropNode={(dragId, targetId) => {
            if (dragId !== targetId) {
              const dragged = findNode(tree, dragId);
              if (!dragged) return;
              setTree((prev) =>
                addChildNode(removeNode(prev, dragId), targetId, dragged)
              );
            }
          }}
        />
      ))}
    </div>
  );
};
