import nextServer from './api';
import type { User } from '@/types/user';

const getAuthHeaders = async () => {
  const { cookies } = await import('next/headers');
  const cookieStore = cookies();
  return { Cookie: cookieStore.toString() };
};

export const getMeServer = async (): Promise<User> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get<User>('/users/me', { headers });
  return data;
};
