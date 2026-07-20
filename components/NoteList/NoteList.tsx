'use client';

import { Note } from '@/types/note';
import css from './NoteList.module.css';
import { deleteNote, fetchNotes } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';

interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  //   const [search, setSearch] = useState<string | undefined>(undefined);
  //   const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  //   const handleSearch = useDebouncedCallback((search: string) => {
  //     setSearch(search);
  //     setCurrentPage(1);
  //   }, 1000);

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

  //   // const totalPages = data?.totalPages ?? 0;
  //   //   const handleClick = (note: Note) => {
  //   //     console.log(note.id);
  //   //   };
  //   const { data, isSuccess, isLoading } = useQuery({
  //     queryKey: ['notes', search, currentPage],
  //     queryFn: () => fetchNotes(currentPage, search),
  //     // placeholderData: keepPreviousData,
  //     // keepPreviousData: true,
  //     placeholderData: prev => prev,
  //   });

  //   const notesToDisplay = data?.notes ?? notes;
  //   const totalPages = data?.totalPages ?? 0;

  return (
    <>
      {/* {isLoading && <p>Loading, please wait...</p>}
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link href="/notes/createNote">
          <button className={css.link}>Create note +</button>
        </Link>
      </div> */}
      <ul className={css.list}>
        {notes.map((note: Note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`}>
                <button className={css.link}>View details</button>
              </Link>
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
    </>
  );
}
