import React, { useEffect, useState } from 'react';
import Flex from '../../../components/primitives/flex/Flex';
import Title from '../../../components/primitives/title/Title';
import { inputProps } from '../../../components/primitives/input/SignInLogin';
import Form from '../../../components/primitives/form/Form';
import Input from '../../../components/primitives/input/generic-input/Input';
import TextArea from '../../../components/primitives/textarea/TextArea';
import Submit from '../../../components/primitives/submit/Submit';
import Container from '../../../components/primitives/wrapper/Container';
import ErrorLine from '../../../components/primitives/errorLine/ErrorLine';
import { useCreateNewsMutation } from './news.generated';
import { formatDate } from '../../../utils/date.utils';
import SuccessLine from '../../../components/primitives/successLine/SuccessLine';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux';
import {
  setCreatedNewAction,
  setErrorMessageAction,
  setSuccessMessageAction,
} from '../../../redux/reducers/news.reducer';
import { SIGN_IN, UNAUTHORIZED } from '../../../constants';
import Popup from '../../../components/composites/Popup/Popup';
import { useNavigate } from 'react-router-dom';

const NewsForm = () => {
  const navigate = useNavigate();
  const [createNews, { data, error, loading }] = useCreateNewsMutation();
  const createdNew = useSelector((state: any) => state.news.createdNew);
  const errorMessage = useSelector((state: any) => state.news.errorMessage);
  const successMessage = useSelector((state: any) => state.news.successMessage);

  const dispatch = useDispatch();

  let { newsHeader, newsContent } = createdNew;

  const sendNew = (title: string, message: string) => {
    dispatch(setSuccessMessageAction(''));

    if (!title) {
      dispatch(setErrorMessageAction('Fill in title'));
      return;
    }

    if (!message) {
      dispatch(setErrorMessageAction('Fill in message'));
      return;
    }

    dispatch(setErrorMessageAction(''));
    createNews({
      variables: {
        news: {
          newsHeader: title,
          newsContent: message,
          newsDate: formatDate(Date.now()),
        },
      },
    });
  };

  const [IsErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const handleOpenErrorPopup = () => {
    setIsErrorPopupOpen(true);
  };

  const handleCloseErrorPopup = () => {
    setIsErrorPopupOpen(false);
  };

  useEffect(() => {
    if (error) {
      if (error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      dispatch(setSuccessMessageAction('Created'));
      dispatch(setCreatedNewAction({ newsHeader: '', newsContent: '' }));
    }
  }, [dispatch, data]);

  return (
    <Container height={'100%'}>
      <Flex alignItems={'center'} height={'100%'}>
        <Form name={'form'}>
          <Title>Add news</Title>
          <Input
            type={'text'}
            name={'newsHeader'}
            {...inputProps}
            value={newsHeader}
            onChange={(e) =>
              dispatch(
                setCreatedNewAction({
                  ...createdNew,
                  newsHeader: e.target.value,
                }),
              )
            }
          />
          <TextArea
            name={'newsMessage'}
            value={newsContent}
            resize={'none'}
            onChange={(e) =>
              dispatch(
                setCreatedNewAction({
                  ...createdNew,
                  newsContent: e.target.value,
                }),
              )
            }
          />

          <Submit
            onClick={() => sendNew(newsHeader, newsContent)}
            onBlur={() => {
              if (successMessage) dispatch(setSuccessMessageAction(''));

              if (errorMessage) dispatch(setErrorMessageAction(''));
            }}
          >
            {loading ? 'loading...' : ' Create news'}
          </Submit>
          {errorMessage ? (
            <ErrorLine>{errorMessage}</ErrorLine>
          ) : (
            <SuccessLine visibility={successMessage ? 'visible' : 'hidden'}>
              {successMessage ? successMessage : 'Mock'}
            </SuccessLine>
          )}
        </Form>
      </Flex>

      <Popup
        isOpen={IsErrorPopupOpen}
        onClose={handleCloseErrorPopup}
        zIndex={'99'}
      >
        <ErrorLine backgroundColor={'transparent'}>
          {error && error.message}
        </ErrorLine>
        <Container>
          <Submit onClick={() => handleCloseErrorPopup()}>Ok</Submit>
        </Container>
      </Popup>
    </Container>
  );
};

export default NewsForm;
