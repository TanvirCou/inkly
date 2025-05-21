import { auth } from '@clerk/nextjs/server';

export async function getAllActivities() {
  const { getToken } = await auth();
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activity/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res);

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}

export async function getSingleUserActivities() {
  const { getToken } = await auth();
  const token = await getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/activity/single-user-activity`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Error in fetching data');
  }
  return res.json();
}
