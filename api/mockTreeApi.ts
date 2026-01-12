import { TreeNode } from "@/types/tree";

export const fetchChildren = (parentId: string): Promise<TreeNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: `${parentId}-1`,
          name: "Level A",
          hasChildren: true,
        },
        {
          id: `${parentId}-2`,
          name: "Level A",
        },
      ]);
    }, 800);
  });
};
