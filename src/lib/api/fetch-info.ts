export async function getWebInfo() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/webinfo`, {
    next: {
      revalidate: 10,
    },
  });

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}
