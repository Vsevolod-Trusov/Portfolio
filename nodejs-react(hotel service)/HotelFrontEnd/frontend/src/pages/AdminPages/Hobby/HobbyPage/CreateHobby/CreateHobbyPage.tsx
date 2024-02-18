import React, { PropsWithChildren, useEffect } from 'react';
import Container from '../../../../../components/primitives/wrapper/Container';
import { IForm } from '../../../interfaces';
import {
  setCreatingHobby,
  setHobbyErrorAction,
  setHobbySuccessAction,
} from '../../../../../redux/reducers/hobby.reducer';
import { checkPrice } from '../../../../../utils/form.cheks.utils';
import CreateForm, {
  ICheckAndSendEntityProps,
} from '../../../../../components/composites/CreateForm/CreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateHobbyMutation } from '../data/hobby.generated';

const CREATE_HOBBY = 'Create hobby';
const CREATE_HOBBY_TITLE = 'Creating Hobby';

const checkAndSend = ({
  name,
  description,
  price,
  dispatch,
  graphql,
}: ICheckAndSendEntityProps) => {
  if (!name) {
    dispatch(setHobbyErrorAction('Fill in name'));
    return;
  }

  if (!description) {
    dispatch(setHobbyErrorAction('Fill in description'));
    return;
  }

  if (!checkPrice(price)) {
    dispatch(setHobbyErrorAction('Invalid price value'));
    return;
  }

  graphql({
    variables: {
      hobby: {
        leisureName: name,
        description: description,
        price: +price,
      },
    },
  });
};

const CreateHobbyPage = (props: PropsWithChildren<IForm>) => {
  const creatingHobby = useSelector(
    (state: any) => state.hobbies.creatingHobby,
  );
  const dispatch = useDispatch();
  const successMessage = useSelector(
    (state: any) => state.hobbies.hobbySuccess,
  );
  const errorMessage = useSelector((state: any) => state.hobbies.hobbyError);
  const [createHobby, { data, error, loading }] = useCreateHobbyMutation();

  useEffect(() => {
    if (error) {
      dispatch(setHobbyErrorAction(error.message));
    }
  }, [error]);

  return (
    <Container padding={'0'}>
      <CreateForm
        changeTab={props.changeTab}
        name={creatingHobby.name}
        description={creatingHobby.description}
        creatingEntity={creatingHobby}
        price={creatingHobby.price}
        dispatch={dispatch}
        setAction={setCreatingHobby}
        graphql={createHobby}
        checkAndSend={checkAndSend}
        successMessage={successMessage}
        errorMessage={errorMessage}
        mockButton={CREATE_HOBBY}
        data={data}
        isLoading={loading}
        title={CREATE_HOBBY_TITLE}
        setEntitySuccessAction={setHobbySuccessAction}
        setEntityErrorAction={setHobbyErrorAction}
      />
    </Container>
  );
};

export default CreateHobbyPage;
