import { auth } from '@clerk/nextjs/server';

export async function getInquiries() {
  const { getToken } = await auth();
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/get`, {
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
