import { Dispatch, SetStateAction } from 'react';

export type TNote = {
  id: string;
  title: string;
  description: string;
  dateCreation: Date | null;
  author?: string;
  isShared?: boolean;
};

export type TSelectedNode = {
  note?: TNote;
  dateCreation?: string;
  notes?: TNote[];
  setNotes?: Dispatch<SetStateAction<TNote[]>>;
};

export type TUpdateNote = {
  description?: string;
  isShared?: boolean;
};

export type TNoteListProps = {
  handleSetSelectedNote?: (item: TNote) => void;
  handleNavigateToCreate?: () => void;
} & TSelectedNode;

export type TInfinityScrollProps = {
  isShared: boolean;
  handleSetSelectedNote?: (item: TNote) => void;
};
