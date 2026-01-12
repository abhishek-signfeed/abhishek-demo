import { TreeNode } from "@/types/tree";

export const updateNode = (
  nodes: TreeNode[],
  id: string,
  cb: (node: TreeNode) => TreeNode
): TreeNode[] =>
  nodes.map((node) => {
    if (node.id === id) return cb(node);
    if (node.children) {
      return { ...node, children: updateNode(node.children, id, cb) };
    }
    return node;
  });

export const removeNode = (nodes: TreeNode[], id: string): TreeNode[] =>
  nodes
    .filter((n) => n.id !== id)
    .map((n) =>
      n.children ? { ...n, children: removeNode(n.children, id) } : n
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
