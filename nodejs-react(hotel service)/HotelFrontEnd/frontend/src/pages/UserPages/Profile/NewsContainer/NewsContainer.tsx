import React, { useEffect, useState } from 'react';
import { NEWS_COLUMNS } from '../contsnts';
import EntityInfoPanel from '../../../../components/composites/EntityPanelInfo/EntityPanelInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetLastNewsLazyQuery,
  usePubSubSubscription,
} from '../profileNews.generated';
import { setNewsAction } from '../../../../redux/reducers/news.reducer';
import Container from '../../../../components/primitives/wrapper/Container';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import Submit from '../../../../components/primitives/submit/Submit';
import Popup from '../../../../components/composites/Popup/Popup';

const NewsContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const news = useSelector((state: any) => state.news.news);
  const { data, error, loading } = usePubSubSubscription();
  const [getLastNews, newsProps] = useGetLastNewsLazyQuery({
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

  useEffect(() => {
    if (newsProps.error) {
      if (newsProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [newsProps.error]);

  useEffect(() => {
    if (!data) {
      getLastNews();
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setNewsAction(data.createNews));
    }
  }, [data]);

  useEffect(() => {
    if (newsProps.data) {
      dispatch(setNewsAction(newsProps.data.getLastNews));
    }
  }, [newsProps.data]);

  return (
    <Container padding={'0'}>
      {window.sessionStorage.getItem('isSubscribed') ? (
        window.sessionStorage.getItem('isSubscribed') === 'true' ? (
          <EntityInfoPanel
            data={news}
            columns={NEWS_COLUMNS}
            onRowClickedHandler={() => {}}
          />
        ) : (
          <Container> Subscribe to get news) </Container>
        )
      ) : (
        <Navigate to={'/HotelFrontEnd/signIn'} />
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

export default NewsContainer;
