import React, { useEffect } from 'react';
import Container from '../../../../components/primitives/wrapper/Container';
import { IForm } from '../../interfaces';
import CreateRoomForm from './CreateRoomForm';
import {
  setCreatingMealAction,
  setMealErrorAction,
  setMealSuccessAction,
} from '../../../../redux/reducers/meal.reducer';
import {
  setCreatingRoomAction,
  setRoomErrorAction,
  setRoomSuccessAction,
} from '../../../../redux/reducers/room.reducer';
import { ICheckAndSendRoomProps } from '../../../../components/composites/CreateForm/CreateForm';
import { checkPrice } from '../../../../utils/form.cheks.utils';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateRoomMutation } from '../RoomPage/data/roomDate.generated';

const CREATE_ROOM = 'Create room';
const CREATE_ROOM_TITLE = 'Creating Room';

const checkAndSend = ({
  roomNumber,
  roomType,
  dispatch,
  graphql,
}: ICheckAndSendRoomProps) => {
  const { basePrice, amountBed, type } = roomType;

  if (!roomNumber) {
    dispatch(setRoomErrorAction('Fill in room number'));
    return;
  }

  if (!type) {
    dispatch(setRoomErrorAction('Fill in type'));
    return;
  }

  if (!checkPrice(amountBed)) {
    dispatch(setRoomErrorAction('Invalid amount bed value'));
    return;
  }

  if (!checkPrice(basePrice)) {
    dispatch(setRoomErrorAction('Invalid price value'));
    return;
  }

  graphql({
    variables: {
      room: {
        roomNumber: roomNumber,
        roomType: {
          basePrice: +basePrice,
          amountBed: +amountBed,
          type: type,
        },
      },
    },
  });
};

const CreateRoomPage = ({ changeTab }: IForm) => {
  const dispatch = useDispatch();
  const creatingRoom = useSelector((state: any) => state.room.creatingRoom);
  const successMessage = useSelector((state: any) => state.room.roomSuccess);
  const errorMessage = useSelector((state: any) => state.room.roomError);

  const [createRoom, { data, error, loading }] = useCreateRoomMutation();

  useEffect(() => {
    if (error) {
      dispatch(setRoomErrorAction(error.message));
    }
  }, [error]);

  return (
    <Container padding={'0'}>
      <CreateRoomForm
        changeTab={changeTab}
        creatingEntity={creatingRoom}
        dispatch={dispatch}
        setAction={setCreatingRoomAction}
        graphql={createRoom}
        checkAndSend={checkAndSend}
        successMessage={successMessage}
        errorMessage={errorMessage}
        mockButton={CREATE_ROOM}
        data={data}
        isLoading={loading}
        title={CREATE_ROOM_TITLE}
        setEntitySuccessAction={setRoomSuccessAction}
        setEntityErrorAction={setRoomErrorAction}
      />
    </Container>
  );
};

export default CreateRoomPage;
