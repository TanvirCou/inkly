import { auth } from '@clerk/nextjs/server';

export async function getAllPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}

export async function getFeaturedPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?featured=true`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}

export async function getSinglePost(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}

export async function getRelatedPosts(category: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?cat=${category}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}

export async function getAuthorPosts(author: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?author=${author}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}

export async function getSavedPosts() {
  const { getToken } = await auth();
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/saved`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}
