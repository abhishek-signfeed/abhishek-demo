import { TreeNode } from "../tree/types";

export const updateNode = (
  nodes: TreeNode[],
  id: string,
  updater: (node: TreeNode) => TreeNode
): TreeNode[] =>
  nodes.map((node) => {
    if (node.id === id) return updater(node);
    if (node.children)
      return { ...node, children: updateNode(node.children, id, updater) };
    return node;
  });

export const removeNode = (nodes: TreeNode[], id: string): TreeNode[] =>
  nodes
    .filter((node) => node.id !== id)
    .map((node) =>
      node.children
        ? { ...node, children: removeNode(node.children, id) }
        : node
    );

export const addChildNode = (
  nodes: TreeNode[],
  parentId: string,
  child: TreeNode
): TreeNode[] =>
  updateNode(nodes, parentId, (node) => ({
    ...node,
    isExpanded: true,
    children: [...(node.children || []), child],
  }));
