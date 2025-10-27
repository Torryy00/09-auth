import { api } from "./api";

// -------------------- NOTES --------------------
export const fetchNotes = async (params?: Record<string, string>) => {
  const { data } = await api.get("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: { title: string; content: string; tag: string }) => {
  const { data } = await api.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};

// -------------------- AUTH --------------------
interface AuthCredentials {
  email: string;
  password: string;
}

export const register = async (credentials: AuthCredentials) => {
  const { data } = await api.post("/auth/register", credentials);
  return data;
};

export const login = async (credentials: AuthCredentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await api.get("/auth/session");
  return data;
};

// -------------------- USER --------------------
export const getMe = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const updateMe = async (userData: Record<string, unknown>) => {
  const { data } = await api.patch("/users/me", userData);
  return data;
};