export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  img?: string;
  title?: string;
  bio?: string;
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
  visit: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type Comment = {
  _id: string;
  user: User;
  post: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Admin = {
  _id: string;
  clerkUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  img: string;
  savedPosts: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Info = {
  _id: string;
  title: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Category = {
  _id: string;
  label: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ActivityType = {
  _id: string;
  message: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
