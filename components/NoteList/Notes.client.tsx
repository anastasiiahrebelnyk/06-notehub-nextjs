'use client';

import { Note } from '@/types/note';
import css from './Notes.module.css';
import { deleteNote, getNote } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const deleteNoteM = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleClick = (note: Note) => {
    deleteNoteM.mutate(note.id);
  };

  //   const handleClick = (note: Note) => {
  //     console.log(note.id);
  //   };

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.link}>
              <Link href={`/notes/${note.id}`}>View details</Link>
            </button>
            <button
              className={css.button}
              onClick={() => {
                handleClick(note);
              }}
              disabled={deleteNoteM.isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
