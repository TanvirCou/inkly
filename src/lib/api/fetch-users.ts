import { auth } from '@clerk/nextjs/server';

export async function getUsers() {
  const { getToken } = await auth();
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/admins`, {
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

export async function getSingleUser() {
  const { getToken } = await auth();
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function getAllUsers() {
  const { getToken } = await auth();
  const token = await getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/all-users`,
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
