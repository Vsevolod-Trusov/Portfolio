import { PropsWithChildren } from 'react';

import { TNote } from 'pages/NoteList/types';

export interface INodesLayout {
  notes: TNote[];
  title?: string;
  handleSetSelectedNote?: (item: TNote) => void;
}

export interface INotes {
  notes: TNote[];
  handleSetSelectedNote: (item: TNote) => void;
  selectedNoteId?: string;
}

export interface IInfinityScroll extends INodesLayout {
  hasMore: boolean;
  setNotes: () => void;
  dataLength?: number;
}

export interface IStyleNote extends PropsWithChildren {
  selected: boolean;
}

export interface INotesButton extends PropsWithChildren {
  selected: boolean;
}
