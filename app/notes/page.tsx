import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteClient from './Notes.client';

export default async function Notes() {
  const queryClient = new QueryClient();
  const response = await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes(1, undefined),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteClient />
      </HydrationBoundary>
    </>
  );
}
