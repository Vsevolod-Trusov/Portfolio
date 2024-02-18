import { render } from '@testing-library/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { NOTES } from 'pages/NoteList/constants';

import { DROPPABLE_ID } from './constants';
import NotesLayout from './NotesLayout';

describe('set to test notes array is displayed', () => {
  const mockedHandleSetNote = jest.fn();
  const mockedOnDragEnd = jest.fn();

  it('expect array is displayed', async () => {
    const container = await render(
      <DragDropContext onDragEnd={mockedOnDragEnd}>
        <Droppable droppableId={DROPPABLE_ID} type={'group'}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <NotesLayout
                notes={NOTES}
                handleSetSelectedNote={mockedHandleSetNote}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    );

    const list = container.getAllByRole('button');

    expect(list.length).toBe(15);
  });
});
