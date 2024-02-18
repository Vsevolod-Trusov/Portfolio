import React, { useEffect, useState } from 'react';
import Container from '../../../../components/primitives/wrapper/Container';
import EntityInfoPanel from '../../../../components/composites/EntityPanelInfo/EntityPanelInfo';
import { FEEDBACK_COLUMNS } from './feedback.columns';
import { useGetFeedbacksQuery } from '../FeedbackPage/feedback.generated';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import Submit from '../../../../components/primitives/submit/Submit';
import Popup from '../../../../components/composites/Popup/Popup';

const FeedbackContainer = () => {
  const navigate = useNavigate();
  const { data, error, loading } = useGetFeedbacksQuery({
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
    if (error) {
      if (error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [error]);

  return (
    <Container padding={'0'}>
      {data && data.getAllFeedbacks ? (
        <EntityInfoPanel
          data={data.getAllFeedbacks}
          columns={FEEDBACK_COLUMNS}
          onRowClickedHandler={() => {}}
        />
      ) : (
        <Container> No feedbacks yet</Container>
      )}

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

export default FeedbackContainer;
