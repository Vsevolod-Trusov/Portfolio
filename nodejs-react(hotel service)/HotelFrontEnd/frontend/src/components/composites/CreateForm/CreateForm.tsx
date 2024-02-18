import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
} from 'react';
import Form from '../../primitives/form/Form';
import Flex from '../../primitives/flex/Flex';
import Title from '../../primitives/title/Title';
import Container from '../../primitives/wrapper/Container';
import Input from '../../primitives/input/generic-input/Input';
import { inputProps } from '../../primitives/input/SignInLogin';
import {
  setCreatingHobby,
  setHobbyErrorAction,
  setHobbySuccessAction,
} from '../../../redux/reducers/hobby.reducer';
import TextArea from '../../primitives/textarea/TextArea';
import Submit from '../../primitives/submit/Submit';
import ErrorLine from '../../primitives/errorLine/ErrorLine';
import SuccessLine from '../../primitives/successLine/SuccessLine';
import { StyleProps } from '../../../styles/style.type';
import { AnyAction } from 'redux';
import { checkPrice } from '../../../utils/form.cheks.utils';
import { IForm } from '../../../pages/AdminPages/interfaces';
import { IRoomType } from '../../../pages/AdminPages/Room/ChangeRoomPage/interfaces';

export const FLEX_VALUE = '0.31';
export const FLEX_INPUT_VALUE = '0.65';

export const flexWrapProps: StyleProps = {
  justifyContent: 'space-between',
  minWidth: '90%',
  margin: '1rem auto',
};

export interface ICheckAndSendEntityProps {
  name: string;
  description: string;
  price: string;
  dispatch: Dispatch<AnyAction>;
  graphql: any;
  changeTab: Dispatch<SetStateAction<string>>;
}

export interface ICheckAndSendRoomProps {
  roomNumber: string;
  roomType: IRoomType;
  dispatch: Dispatch<AnyAction>;
  graphql: any;
  checkAndSend: any;
  changeTab: Dispatch<SetStateAction<string>>;
}

interface ICreateFrom extends IForm {
  creatingEntity: any;
  name: string;
  description: string;
  price: string;
  dispatch: Dispatch<AnyAction>;
  setAction: any;
  graphql: any;
  checkAndSend: any;
  successMessage: string;
  errorMessage: string;
  mockButton: string;
  data: any;
  isLoading: boolean;
  error?: any;
  title: string;
  setEntitySuccessAction: any;
  setEntityErrorAction: any;
}

const CreateForm = ({
  name,
  description,
  price,
  dispatch,
  graphql,
  setAction,
  checkAndSend,
  creatingEntity,
  changeTab,
  successMessage,
  errorMessage,
  mockButton,
  isLoading,
  data,
  title,
  setEntitySuccessAction,
  setEntityErrorAction,
}: PropsWithChildren<ICreateFrom>) => {
  useEffect(() => {
    if (data) {
      dispatch(setEntitySuccessAction('Created'));
      dispatch(
        setAction({
          name: '',
          description: '',
          price: '',
        }),
      );
    }
  }, [data, setAction]);

  return (
    <Form maxWidth={'90%'} minHeight={'100%'} display={'flex'}>
      <Flex flexDirection={'column'} alignItems={'center'} minWidth={'100%'}>
        <Title>{title}</Title>

        <Flex {...flexWrapProps}>
          <Container flex={FLEX_VALUE} alignSelf={'center'}>
            <Flex>Name:</Flex>
          </Container>
          <Container flex={FLEX_INPUT_VALUE}>
            <Container textAlign={'center'}>
              <Input
                {...inputProps}
                minWidth={'50%'}
                name={'name'}
                value={name}
                onChange={(e) =>
                  dispatch(
                    setAction({
                      ...creatingEntity,
                      name: e.target.value,
                    }),
                  )
                }
              />
            </Container>
          </Container>
        </Flex>

        <Flex {...flexWrapProps}>
          <Container flex={FLEX_VALUE} alignSelf={'center'}>
            <Flex>Price:</Flex>
          </Container>
          <Container flex={FLEX_INPUT_VALUE}>
            <Container textAlign={'center'}>
              <Input
                {...inputProps}
                minWidth={'50%'}
                name={'hobbyPrice'}
                value={price}
                onChange={(e) =>
                  dispatch(
                    setAction({
                      ...creatingEntity,
                      price: e.target.value,
                    }),
                  )
                }
              />
            </Container>
          </Container>
        </Flex>

        <Flex {...flexWrapProps}>
          <TextArea
            name={'hobbyDescription'}
            value={description}
            resize={'none'}
            onChange={(e) =>
              dispatch(
                setAction({
                  ...creatingEntity,
                  description: e.target.value,
                }),
              )
            }
          />
        </Flex>

        <Flex
          justifyContent={'space-between'}
          minWidth={'80%'}
          margin={'0.4rem 0 0 0'}
        >
          <Container flex={'0.4'}>
            <Submit onClick={() => changeTab && changeTab('1')}>Back</Submit>
          </Container>
          <Container flex={'0.4'}>
            <Submit
              onClick={() => {
                checkAndSend({
                  name: creatingEntity.name,
                  description: creatingEntity.description,
                  price: creatingEntity.price,
                  dispatch: dispatch,
                  graphql: graphql,
                  changeTab: changeTab,
                });
              }}
              onBlur={() => {
                if (successMessage) dispatch(setEntitySuccessAction(''));

                if (errorMessage) dispatch(setEntityErrorAction(''));
              }}
            >
              {isLoading ? 'Loading...' : mockButton}
            </Submit>
          </Container>
        </Flex>

        <Container>
          {errorMessage ? (
            <ErrorLine>{errorMessage}</ErrorLine>
          ) : (
            <SuccessLine visibility={successMessage ? 'visible' : 'hidden'}>
              {successMessage ? successMessage : 'Mock'}
            </SuccessLine>
          )}
        </Container>
      </Flex>
    </Form>
  );
};

export default CreateForm;
