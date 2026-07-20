// import NoteList from '@/app/notes/Notes.client';

import { fetchNotes } from '@/lib/api';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteClient from './Notes.client';

// interface NoteProps {
//   page: number;
//   search: string | undefined;
// }

// export default async function Note({ page, search }: NoteProps) {
//   const response = await fetchNotes(page, search);
//   return <NoteList notes={response.notes} />;
// }
// interface NoteProps {
//   notes: Note[];
// }

export default async function Notes() {
  const queryClient = new QueryClient();
  const response = await queryClient.fetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(1, undefined),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <Pagination totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}> */}
        <NoteClient notes={response.notes} />
      </HydrationBoundary>
    </>
  );
}
