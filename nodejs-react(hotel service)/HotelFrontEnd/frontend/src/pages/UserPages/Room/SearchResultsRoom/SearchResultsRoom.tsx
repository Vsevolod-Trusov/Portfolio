import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  setOrderPriceAction,
  setSelectRoomTypeAction,
} from '../../../../redux/reducers/room.reducer';
import Submit from '../../../../components/primitives/submit/Submit';
import Container from '../../../../components/primitives/wrapper/Container';
import EntityInfoPanel from '../../../../components/composites/EntityPanelInfo/EntityPanelInfo';
import { ROOM_TYPES_COLUMNS } from './roomTypes.columns';

function getDays(startDate: string, finishDate: string): number {
  const start = new Date(startDate);
  const end = new Date(finishDate);
  const timeDiff = Math.abs(start.getTime() - end.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

const SearchResultsRoom = () => {
  const navigate = useNavigate();
  const rooms = useSelector((state: any) => state.room.roomTypes);
  const orderPrice = useSelector((state: any) => state.room.orderPrice);
  const startDate = useSelector((state: any) => state.room.startDate);
  const finishDate = useSelector((state: any) => state.room.finishDate);
  const dispatch = useDispatch();

  if (rooms.length === 0) {
    return <Navigate to={'/HotelFrontEnd/'} />;
  }

  return (
    <div>
      <Container padding={'1rem'}>
        <EntityInfoPanel
          data={rooms}
          columns={ROOM_TYPES_COLUMNS}
          onRowClickedHandler={(row: any) => {
            dispatch(
              setOrderPriceAction(
                orderPrice + row.basePrice * getDays(startDate, finishDate),
              ),
            );
            dispatch(setSelectRoomTypeAction(row));
            navigate('/HotelFrontEnd/room_service/');
          }}
        />
      </Container>

      <Submit
        onClick={() => {
          navigate('/HotelFrontEnd/');
        }}
      >
        Back
      </Submit>
    </div>
  );
};

export default SearchResultsRoom;
//{rooms.map((item: any, index: any) => {
//         return (
//           <Container key={uuidv4()} padding={'0'}>
//             <Flex>
//               {item.type} {item.basePrice}/Day
//             </Flex>
//             <Flex>{item.basePrice * getDays(startDate, finishDate)}</Flex>
//             <Container padding={'0'}>
//               <Submit
//                 onClick={}
//               >
//                 Select
//               </Submit>
//             </Container>
//           </Container>
//         );
//       })}
