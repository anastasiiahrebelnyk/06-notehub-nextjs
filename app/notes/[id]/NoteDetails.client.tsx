'use client';
import css from './NoteDetails.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
import { fetchNotes, getNote } from '../../../lib/api';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  //   const [isEdit, setIsEdit] = useState<boolean>(false);

  const noteQ = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNote(id),
    refetchOnMount: false,
  });
  //   const toggleEdit = () => {
  //     setIsEdit(prevIsEdit => !prevIsEdit);
  //   };

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{noteQ.data?.title}</h2>
            </div>
            <p className={css.tag}>{noteQ.data?.tag}</p>
            <p className={css.content}>{noteQ.data?.content}</p>
            <p className={css.date}>{noteQ.data?.createdAt}</p>
          </div>
        </div>
      </main>
    </>
  );
}
