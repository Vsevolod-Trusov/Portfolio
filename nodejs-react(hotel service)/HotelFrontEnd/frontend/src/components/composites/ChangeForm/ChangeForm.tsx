import React, { Dispatch } from 'react';
import Flex from '../../primitives/flex/Flex';
import Title from '../../primitives/title/Title';
import Container from '../../primitives/wrapper/Container';
import Input from '../../primitives/input/generic-input/Input';
import { inputProps } from '../../primitives/input/SignInLogin';
import { setHobbyAction } from '../../../redux/reducers/hobby.reducer';
import TextArea from '../../primitives/textarea/TextArea';
import Submit from '../../primitives/submit/Submit';
import DeleteButton from '../../primitives/submit/DeleteButton/DeleteButton';
import ErrorLine from '../../primitives/errorLine/ErrorLine';
import Form from '../../primitives/form/Form';
import { AnyAction } from 'redux';
import { IForm } from '../../../pages/AdminPages/interfaces';

export interface IChangeForm extends IForm {
  selectedEntity: any;
  mock: string;
  name?: string;
  price?: string;
  description?: string;
  dispatch: Dispatch<AnyAction>;
  setAction: any;
  graphqlDelete: any;
  checkAndSend: any;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface ISelectedEntity {
  name: string;
  price: string;
  description: string;
}

const ChangeForm = ({
  selectedEntity,
  mock,
  name,
  price,
  description,
  dispatch,
  setAction,
  changeTab,
  graphqlDelete,
  checkAndSend,
  errorMessage,
  setErrorMessage,
}: IChangeForm) => {
  return (
    <Form maxWidth={'90%'} minHeight={'100%'} display={'flex'}>
      {Object.keys(selectedEntity).length === 0 ? (
        mock
      ) : (
        <Flex flexDirection={'column'} alignItems={'center'} minWidth={'100%'}>
          <Title>{name}</Title>
          <Flex
            justifyContent={'space-between'}
            minWidth={'70%'}
            margin={'1rem auto'}
          >
            <Flex justifyContent={'center'} alignItems={'center'}>
              Price:
            </Flex>
            <Container padding={'0'}>
              <Input
                name={'price'}
                type={'text'}
                value={price}
                {...inputProps}
                onChange={(e) =>
                  dispatch(
                    setAction({
                      ...selectedEntity,
                      price: e.target.value,
                    }),
                  )
                }
              />
            </Container>
          </Flex>
          <Flex minWidth={'90%'}>
            <TextArea
              name={'description'}
              value={description}
              resize={'none'}
              minWidth={'80%'}
              minHeight={'110%'}
              onChange={(e) =>
                dispatch(
                  setAction({
                    ...selectedEntity,
                    description: e.target.value,
                  }),
                )
              }
            />
          </Flex>
          <Flex
            padding={'0'}
            margin={'1rem 0 0 0'}
            backgroundColor={'transparent'}
            minWidth={'90%'}
          >
            <Submit
              minWidth={'30%'}
              onClick={() => {
                changeTab && changeTab('1');
              }}
            >
              Back
            </Submit>

            <DeleteButton
              minWidth={'30%'}
              onClick={() => {
                graphqlDelete({
                  variables: {
                    name: name,
                  },
                });
              }}
            >
              Delete
            </DeleteButton>

            <Submit
              minWidth={'30%'}
              onClick={() => {
                checkAndSend(selectedEntity);
              }}
              onBlur={() => {
                if (errorMessage) {
                  setErrorMessage('');
                }
              }}
            >
              Change Hobby
            </Submit>
          </Flex>
          {errorMessage ? (
            <ErrorLine>{errorMessage}</ErrorLine>
          ) : (
            <ErrorLine visibility={'hidden'}>Mock</ErrorLine>
          )}
        </Flex>
      )}
    </Form>
  );
};

export default ChangeForm;
