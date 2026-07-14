import NoteList from '@/components/NoteList/Notes.client';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api';

// interface NoteProps {
//   page: number;
//   search: string | undefined;
// }

// export default async function Note({ page, search }: NoteProps) {
//   const response = await fetchNotes(page, search);
//   return <NoteList notes={response.notes} />;
// }
export default async function Note() {
  const response = await fetchNotes();
  return (
    <>
      {/* <Pagination totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}> */}
      <NoteList notes={response.notes} />
    </>
  );
}
