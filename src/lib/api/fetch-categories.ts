export async function getAllCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/get`);

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}
