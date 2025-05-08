export async function getAllPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    next: {
      revalidate: 10,
    },
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
      next: {
        revalidate: 10,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}

export async function getSinglePost(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
    next: {
      revalidate: 10,
    },
  });

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}
