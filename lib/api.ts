import { Note, NoteFormValues } from '@/types/note';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// const API_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYXN0YXNpaWFocmViZWxueWtAZ21haWwuY29tIiwiaWF0IjoxNzgzMTUwNzk5fQ.bZpsdsSMpdBCX7K3XNH65hlfOuhkz-UlUKccFtAr5qg';

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

// export const fetchNotes = async (): Promise<NoteHTTPResponse> => {
//   const res = await API.get<NoteHTTPResponse>('/notes', {
//     params: {
//       perPage: 12,
//     },
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//     },
//   });
//   return res.data;
// };

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const res = await API.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return res.data;
};

export const createNote = async (values: NoteFormValues): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', values, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};

export const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};
