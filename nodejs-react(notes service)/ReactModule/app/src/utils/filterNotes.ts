import { FILTER_TYPES } from 'components/FilterNotes/constants';
import { TNote } from 'pages/NoteList/types';

const filterNotes = (
  notesPages: TNote[][],
  filterType: string,
  filterValue: string,
) =>
  notesPages.map((notePage) =>
    notePage.filter((note: TNote) => {
      if (filterType === FILTER_TYPES.DATE) {
        return (
          new Date(filterValue).toISOString() ===
          new Date(note.dateCreation).toISOString()
        );
      } else {
        return note.title === filterValue;
      }
    }),
  );

export default filterNotes;
