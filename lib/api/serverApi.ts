import nextServer from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

const getAuthHeaders = async () => {
  const { cookies } = await import('next/headers');
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();
  return { Cookie: cookieHeader };
};


export const fetchNotes = async (p0: { page: number; perPage: number; tag: string | undefined; }): Promise<Note[]> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get<Note[]>('/notes', { headers, params: p0 });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, { headers });
  return data;
};


export const getMeServer = async (): Promise<User> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get<User>('/users/me', { headers });
  return data;
};


export const checkServerSession = async () => {
  const headers = await getAuthHeaders();
  const response = await nextServer.get<{ authenticated: boolean }>('/auth/session', { headers });

  return response;
};