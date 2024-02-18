import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectTourAction,
  setToursAction,
} from '../../../redux/reducers/tour.reducer';
import { useGetAllToursLazyQuery } from './tourMenu.generated';
import { useNavigate } from 'react-router-dom';
import Container from '../../primitives/wrapper/Container';
import EntityInfoPanel from '../EntityPanelInfo/EntityPanelInfo';
import { TOUR_COLUMNS } from '../../../pages/AdminPages/Tour/TourPage/tour.columns';
import { SIGN_IN, UNAUTHORIZED } from '../../../constants';
import ErrorLine from '../../primitives/errorLine/ErrorLine';
import Submit from '../../primitives/submit/Submit';
import Popup from '../Popup/Popup';

const TourMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tours = useSelector((state: any) => state.tour.tours);
  const [getTours, { data, loading, error }] = useGetAllToursLazyQuery({
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
    if (!data) {
      getTours();
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setToursAction(data.getAllTours));
    }
  }, [data]);

  return (
    <Container padding={'1rem'}>
      <EntityInfoPanel
        data={tours}
        columns={TOUR_COLUMNS}
        onRowClickedHandler={(row: any) => {
          dispatch(setSelectTourAction(row));
          navigate('/HotelFrontEnd/order_tour');
        }}
      />

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

export default TourMenu;
// {tours &&
//         tours.map((item: any) => {
//           return (
//             <Flex>
//               <div key={uuidv4()}>{item.tourName}</div>
//               <div key={uuidv4()}>{item.tourPrice}</div>
//
//               <button
//                 onClick={() => {
//                   dispatch(setSelectTourAction(item));
//                   navigate('/HotelFrontEnd/order_tour');
//                 }}
//               >
//                 Add
//               </button>
//             </Flex>
//           );
//         })}
