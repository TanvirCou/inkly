export async function getComments(postId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${postId}`
  );

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}

export async function getAllComments() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/`);

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}
