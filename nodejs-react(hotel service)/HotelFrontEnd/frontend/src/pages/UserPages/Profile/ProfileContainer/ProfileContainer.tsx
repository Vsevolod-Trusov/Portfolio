import React, { useEffect, useState } from 'react';
import Flex from '../../../../components/primitives/flex/Flex';
import Form from '../../../../components/primitives/form/Form';
import Submit from '../../../../components/primitives/submit/Submit';
import Container from '../../../../components/primitives/wrapper/Container';
import {
  useIsSubscribedQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from './profileContainer.generated';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../../components/composites/Popup/Popup';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';

const ProfileContainer = () => {
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState<string>(
    window.sessionStorage.getItem('isSubscribed') === 'true' ? 'Yes' : 'No',
  );
  const { data, error, loading, refetch } = useIsSubscribedQuery({
    variables: {
      token: window.sessionStorage.getItem('token') || '',
    },
    fetchPolicy: 'no-cache',
  });

  const [subscribe, subscribedProps] = useSubscribeMutation({
    fetchPolicy: 'no-cache',
  });

  const [unsubscribe, unsubscribedProps] = useUnsubscribeMutation({
    fetchPolicy: 'no-cache',
  });

  const [IsErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const handleOpenErrorPopup = () => {
    setIsErrorPopupOpen(true);
  };

  const handleCloseErrorPopup = () => {
    setIsErrorPopupOpen(false);
  };

  useEffect(() => {
    if (data) {
      window.sessionStorage.setItem('isSubscribed', `${data.getIsSubscribed}`);
      setIsSubscribed(data.getIsSubscribed ? 'Yes' : 'No');
    }
  }, [data]);

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
    if (subscribedProps.data) {
      refetch({
        token: window.sessionStorage.getItem('token') || '',
      });
    }
  }, [subscribedProps.data]);

  useEffect(() => {
    if (unsubscribedProps) {
      refetch({
        token: window.sessionStorage.getItem('token') || '',
      });
    }
  }, [unsubscribedProps.data]);

  useEffect(() => {
    if (subscribedProps.error) {
      if (subscribedProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [subscribedProps.error]);

  useEffect(() => {
    if (unsubscribedProps.error) {
      if (unsubscribedProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [unsubscribedProps.error]);

  return (
    <Container height={'100%'}>
      <Flex alignItems={'center'} height={'100%'}>
        <Form name={'form'} minWidth={'80%'}>
          <Flex
            flexDirection={'column'}
            alignItems={'center'}
            minWidth={'100%'}
          >
            <Flex justifyContent={'space-between'} minWidth={'40%'}>
              <Container>Login:</Container>

              <Container>
                {window.sessionStorage.getItem('login') || 'Login'}
              </Container>
            </Flex>

            <Flex justifyContent={'space-between'} minWidth={'40%'}>
              <Container>Email:</Container>

              <Container>
                {window.sessionStorage.getItem('email') || 'Email'}
              </Container>
            </Flex>

            <Flex justifyContent={'space-between'} minWidth={'40%'}>
              <Container>You subscribed:</Container>

              <Container>{isSubscribed}</Container>
            </Flex>

            <Flex justifyContent={'space-between'} minWidth={'50%'}>
              <Flex alignItems={'center'}>News Subscription:</Flex>
              <Flex minWidth={'50%'} justifyContent={'space-between'}>
                <Container>
                  <Submit
                    maxWidth={'20%'}
                    disabled={data && data.getIsSubscribed}
                    onClick={() => {
                      subscribe({
                        variables: {
                          token: window.sessionStorage.getItem('token') || '',
                        },
                      });
                    }}
                  >
                    {subscribedProps.loading ? 'Loading...' : ' Subscribe'}
                  </Submit>
                </Container>

                <Container>
                  <Submit
                    maxWidth={'20%'}
                    disabled={!(data && data.getIsSubscribed)}
                    onClick={() => {
                      unsubscribe({
                        variables: {
                          token: window.sessionStorage.getItem('token') || '',
                        },
                      });
                    }}
                  >
                    {unsubscribedProps.loading ? 'Loading...' : 'UnSubscribe'}
                  </Submit>
                </Container>
              </Flex>
            </Flex>
          </Flex>
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

export default ProfileContainer;
