import React, { useEffect, useState } from 'react';
import Container from '../../../../components/primitives/wrapper/Container';
import Flex from '../../../../components/primitives/flex/Flex';
import { useCreateFeedbackMutation } from './feedback.generated';
import Submit from '../../../../components/primitives/submit/Submit';
import { Navigate, useNavigate } from 'react-router-dom';
import Select from '../../../../components/primitives/select/Select';
import { useSelector } from 'react-redux';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import Popup from '../../../../components/composites/Popup/Popup';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import Form from '../../../../components/primitives/form/Form';
import Title from '../../../../components/primitives/title/Title';
import TextArea from '../../../../components/primitives/textarea/TextArea';

const OPTIONS = [
  {
    label: '5',
    value: '5',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '1',
    value: '1',
  },
];

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sendFeedback, { data, error, loading }] = useCreateFeedbackMutation({
    fetchPolicy: 'no-cache',
  });
  const [feedback, setFeedback] = useState<string>('');
  const [estimation, setEstimation] = useState<string>('1');

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (data) {
      navigate('/HotelFrontEnd/');
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenPopup();
      }
    }
  }, [error]);

  return (
    <Container>
      <Form name={'form'} margin={'0 auto'}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Title>Add feedback</Title>
          <Container padding={'0'}>
            <TextArea
              resize={'none'}
              name={'review'}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Container>
          <Container padding={'0'}>
            <Select
              value={estimation}
              onChange={setEstimation}
              options={OPTIONS}
            />
          </Container>
          <Flex>
            <Submit
              disabled={!(feedback !== '' && +estimation !== 0)}
              onClick={() => {
                if (feedback !== '' && +estimation !== 0)
                  sendFeedback({
                    variables: {
                      feedback: {
                        review: feedback,
                        estimation: +estimation,
                      },
                      token: window.sessionStorage.getItem('token') || '',
                    },
                  });
              }}
            >
              Review
            </Submit>
          </Flex>
        </Flex>
      </Form>

      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} zIndex={'99'}>
        <ErrorLine>{error && error.message}</ErrorLine>
        <Container>
          <Submit onClick={() => handleClosePopup()}>Ok</Submit>
        </Container>
      </Popup>
    </Container>
  );
};

export default FeedbackPage;
