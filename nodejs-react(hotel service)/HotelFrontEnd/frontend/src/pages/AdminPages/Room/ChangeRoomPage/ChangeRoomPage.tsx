import React, { useEffect, useState } from 'react';
import { IForm } from '../../interfaces';
import Container from '../../../../components/primitives/wrapper/Container';
import ChangeRoomForm from '../../../../components/composites/ChangeForm/ChangeRoomForm/ChangeRoomForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  initialChangingRoomState,
  setChangingRoomAction,
} from '../../../../redux/reducers/room.reducer';
import { ISelectedEntity } from '../../../../components/composites/ChangeForm/ChangeForm';
import { IChangingRoom } from './interfaces';
import { checkPrice } from '../../../../utils/form.cheks.utils';
import {
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} from '../RoomPage/data/roomDate.generated';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { useNavigate } from 'react-router-dom';

const CHANGE_ROOM = 'Select Room';

const ChangeRoomPage = ({ changeTab }: IForm) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changingEntity = useSelector((state: any) => state.room.changingRoom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [updateRoom, updatedRoomProps] = useUpdateRoomMutation();
  const [deleteRoom, deletedRoomProps] = useDeleteRoomMutation();

  const checkAndSendUpdate = ({ roomNumber, roomType }: IChangingRoom) => {
    const { basePrice, type, amountBed } = roomType;
    if (!checkPrice(amountBed)) {
      setErrorMessage('Wrong amountBed value');
      return;
    }

    if (!checkPrice(basePrice)) {
      setErrorMessage('Wrong price value');
      return;
    }
    if (!type) {
      setErrorMessage('Wrong type value');
      return;
    }

    updateRoom({
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

    changeTab && changeTab('1');
    dispatch(setChangingRoomAction(initialChangingRoomState));
  };

  useEffect(() => {
    if (updatedRoomProps.error) {
      if (updatedRoomProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [updatedRoomProps.error]);

  useEffect(() => {
    if (deletedRoomProps.error) {
      if (deletedRoomProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [deletedRoomProps.error]);

  return (
    <Container padding={'0'}>
      <ChangeRoomForm
        mock={CHANGE_ROOM}
        selectedEntity={changingEntity}
        name={changingEntity.roomNumber}
        dispatch={dispatch}
        setAction={setChangingRoomAction}
        checkAndSend={checkAndSendUpdate}
        graphqlDelete={deleteRoom}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        changeTab={changeTab}
      />
    </Container>
  );
};

export default ChangeRoomPage;
