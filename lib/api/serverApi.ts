import { api } from "./api";

export const fetchNotes = async (cookies: string, params?: Record<string, string>) => {
  const { data } = await api.get("/notes", {
    params,
    headers: { Cookie: cookies },
  });
  return data;
};

export const fetchNoteById = async (cookies: string, id: string) => {
  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookies },
  });
  return data;
};

export const getMe = async (cookies: string) => {
  const { data } = await api.get("/users/me", {
    headers: { Cookie: cookies },
  });
  return data;
};

export const checkSession = async (cookies: string) => {
  const { data } = await api.get("/auth/session", {
    headers: { Cookie: cookies },
  });
  return data;
};