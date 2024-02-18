import { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectPostNotes } from 'store/slices/notes.slice';
import NotesLayoutContainer from 'pages/NoteList/components/NotesLayout';
import { StyledLoaderWrapper } from 'pages/NoteList/components/NotesLayout/styled';
import { TInfinityScrollProps } from 'pages/NoteList/types';
import { getNotes, getSharedNotes } from 'api/notes';
import { Loader } from 'components';

const InfinityScrollContainer: FC<TInfinityScrollProps> = ({
  isShared,
  handleSetSelectedNote,
}) => {
  const { data, hasNextPage, fetchNextPage, isLoading } = isShared
    ? getSharedNotes()
    : getNotes();

  const postData = useSelector(selectPostNotes);

  const dataLength = data?.pages.length;

  return isLoading ? (
    <StyledLoaderWrapper>
      <Loader />
    </StyledLoaderWrapper>
  ) : (
    <NotesLayoutContainer
      notes={postData}
      dataLength={dataLength}
      hasMore={hasNextPage}
      handleSetSelectedNote={handleSetSelectedNote}
      setNotes={fetchNextPage}
    />
  );
};

export default InfinityScrollContainer;
