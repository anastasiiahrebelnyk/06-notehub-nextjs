'use client';
import css from './NoteDetails.module.css';
import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
import { getNote } from '../../../lib/api';
import { useParams } from 'next/navigation';

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
  );
}
