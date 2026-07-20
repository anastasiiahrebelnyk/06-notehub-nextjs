'use client';

import { Note } from '@/types/note';
import css from './Notes.client.module.css';
import { fetchNotes } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

interface NoteClientProps {
  notes: Note[];
}
export default function NoteClient({ notes }: NoteClientProps) {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  //   const queryClient = useQueryClient();

  const handleSearch = useDebouncedCallback((search: string) => {
    setSearch(search);
    setCurrentPage(1);
  }, 1000);

  //   const deleteNoteM = useMutation({
  //     mutationFn: deleteNote,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ['notes'] });
  //     },
  //     onError: error => {
  //       console.log(error);
  //     },
  //   });

  //   const handleClick = (note: Note) => {
  //     deleteNoteM.mutate(note.id);
  //   };

  //   const totalPages = data?.totalPages ?? 0;
  //     const handleClick = (note: Note) => {
  //       console.log(note.id);
  //     };
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['notes', search, currentPage],
    queryFn: () => fetchNotes(currentPage, search),
    // placeholderData: keepPreviousData,
    // keepPreviousData: true,
    placeholderData: prev => prev,
  });

  //   const notesToDisplay = data?.notes ?? notes;
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      {isLoading && <p>Loading, please wait...</p>}
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
      </div>
      {isSuccess && data && <NoteList notes={data.notes} />}
    </div>
  );
}
