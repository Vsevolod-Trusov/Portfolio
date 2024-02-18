import React, { useEffect } from 'react';
import {
  setCreatingHobby,
  setHobbyErrorAction,
  setHobbySuccessAction,
} from '../../../../redux/reducers/hobby.reducer';
import CreateForm, {
  ICheckAndSendEntityProps,
} from '../../../../components/composites/CreateForm/CreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateHobbyMutation } from '../../Hobby/HobbyPage/data/hobby.generated';
import { checkPrice } from '../../../../utils/form.cheks.utils';
import { IForm } from '../../interfaces';
import { useCreateRoomServiceMutation } from '../data/roomService.generated';
import {
  setCreatingServiceAction,
  setServiceErrorAction,
  setServiceSuccessAction,
} from '../../../../redux/reducers/room.reducer';
import Container from '../../../../components/primitives/wrapper/Container';

const CREATE_SERVICE = 'Create service';
const CREATE_SERVICE_TITLE = 'Creating Service';

const checkAndSend = ({
  name,
  description,
  price,
  dispatch,
  graphql,
}: ICheckAndSendEntityProps) => {
  if (!name) {
    dispatch(setServiceErrorAction('Fill in name'));
    return;
  }

  if (!description) {
    dispatch(setServiceErrorAction('Fill in description'));
    return;
  }

  if (!checkPrice(price)) {
    dispatch(setServiceErrorAction('Invalid price value'));
    return;
  }

  graphql({
    variables: {
      createRoomService: {
        serviceName: name,
        serviceDescription: description,
        servicePrice: +price,
      },
    },
  });
};

const CreateServicePage = ({ changeTab }: IForm) => {
  const creatingService = useSelector(
    (state: any) => state.room.creatingService,
  );
  const dispatch = useDispatch();
  const successMessage = useSelector((state: any) => state.room.serviceSuccess);
  const errorMessage = useSelector((state: any) => state.room.serviceError);
  const [createService, { data, error, loading }] =
    useCreateRoomServiceMutation();

  useEffect(() => {
    if (error) {
      dispatch(setServiceErrorAction(error.message));
    }
  }, [error]);

  return (
    <Container padding={'0'}>
      <CreateForm
        changeTab={changeTab}
        name={creatingService.name}
        description={creatingService.description}
        creatingEntity={creatingService}
        price={creatingService.price}
        dispatch={dispatch}
        setAction={setCreatingServiceAction}
        graphql={createService}
        checkAndSend={checkAndSend}
        successMessage={successMessage}
        errorMessage={errorMessage}
        mockButton={CREATE_SERVICE}
        data={data}
        isLoading={loading}
        title={CREATE_SERVICE_TITLE}
        setEntitySuccessAction={setServiceSuccessAction}
        setEntityErrorAction={setServiceErrorAction}
      />
    </Container>
  );
};

export default CreateServicePage;
