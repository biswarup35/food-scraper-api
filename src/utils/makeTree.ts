export interface IComments {
  id: string;
  parentId: ParentId;
  content: {
    text: string;
    user: string;
  };
}

type ParentId = string;

interface ITree {
  id: string;
  parentId: ParentId;
  content: {
    text: string;
    user: string;
  };
  children: ITree[];
}
[];

const makeTree = (comments: any, parentId: string | null = null): any => {
  return comments
    .filter((comment: any) => comment.parentId === parentId)
    .reduce(
      (tree: any, comment: any) => [
        ...tree,
        {
          ...comment,
          children: makeTree(comments, comment.id),
        },
      ],
      []
    );
};

export default makeTree;
