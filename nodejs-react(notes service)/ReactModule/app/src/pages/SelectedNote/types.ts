import { TNote } from 'pages/NoteList/types';

export interface ISelectedNote {
  note: TNote;
  handleNavigateToEdit: () => void;
  handleShareNote: () => void;
}

export interface ISelectedNoteContainer {
  isShared?: boolean;
}
