export type User = {
  _id: string;
  name: string;
  username: string;
  img?: string;
};

export type Post = {
  _id: string;
  user: User; // or user: any if you don't have a User type yet
  img: string;
  title: string;
  slug: string;
  desc: string;
  category: string;
  content: string; // HTML string
  isFeatured: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};
