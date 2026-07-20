import { Note, NoteFormValues } from '@/types/note';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NoteHTTPResponse {
  notes: Note[];
  totalPages: number;
}

const API = axios.create({ baseURL: 'https://notehub-public.goit.study/api' });

export const fetchNotes = async (
  page: number,
  search: string | undefined
): Promise<NoteHTTPResponse> => {
  const res = await API.get<NoteHTTPResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const res = await API.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return res.data;
};

export const createNote = async (values: NoteFormValues): Promise<Note> => {
  const { data } = await API.post<Note>('/notes', values, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};

export const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await API.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};
