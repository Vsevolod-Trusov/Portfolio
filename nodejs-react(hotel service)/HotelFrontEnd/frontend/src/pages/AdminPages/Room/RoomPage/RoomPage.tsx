import React, { useEffect, useState } from 'react';
import TabPanelIml from '../../../../components/composites/TabPanel/TabPanelIml';
import Container from '../../../../components/primitives/wrapper/Container';
import { Box, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DataTableImpl from '../../../../components/composites/DataTable/DataTable';
import DataTable from 'react-data-table-component';
import {
  useDeleteOneOrderRoomMutation,
  useRoomLazyQuery,
  useRoomOrderLazyQuery,
  useRoomOrderQuery,
  useRoomQuery,
} from './data/roomDate.generated';
import TabContext from '@mui/lab/TabContext';
import { ORDER_ROOM_COLUMNS, ROOM_COLUMNS } from './room.columns';
import Flex from '../../../../components/primitives/flex/Flex';
import { useDispatch, useSelector } from 'react-redux';
import EntityInfoPanel from '../../../../components/composites/EntityPanelInfo/EntityPanelInfo';
import {
  setChangingMealAction,
  setDeletingOrderMealAction,
} from '../../../../redux/reducers/meal.reducer';
import Popup from '../../../../components/composites/Popup/Popup';
import Title from '../../../../components/primitives/title/Title';
import Submit from '../../../../components/primitives/submit/Submit';
import DeleteButton from '../../../../components/primitives/submit/DeleteButton/DeleteButton';
import {
  initialChangingRoomState,
  setChangingRoomAction,
  setDeletingOrderRoomAction,
  setRoomTypeAction,
} from '../../../../redux/reducers/room.reducer';
import ChangeRoomPage from '../ChangeRoomPage/ChangeRoomPage';
import CreateRoomPage from '../СreateRoomPage/CreateRoomPage';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { useNavigate } from 'react-router-dom';

const BUTTON_TEXT = 'Update';

const RoomPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getRooms, queryProps] = useRoomLazyQuery();
  const [getOrderRooms, orderProps] = useRoomOrderLazyQuery();

  const [value, setValue] = React.useState('1');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [deleteRoomOrder, deletedRoomOrderProps] =
    useDeleteOneOrderRoomMutation();

  const deletingOrder = useSelector(
    (state: any) => state.room.deletingRoomOrder,
  );

  const onRowClickHandler = (row: any) => {
    dispatch(setDeletingOrderRoomAction(row));
    handleOpenPopup();
  };

  const onRoomRowClickHandler = (row: any) => {
    dispatch(setChangingRoomAction(row));
    setValue('3');
  };

  useEffect(() => {
    if (queryProps.error) {
      if (queryProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [queryProps.error]);

  useEffect(() => {
    if (orderProps.error) {
      if (orderProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [orderProps.error]);

  useEffect(() => {
    if (!orderProps.data) {
      getOrderRooms();
    }

    if (!queryProps.data) {
      getRooms();
    }
  }, [orderProps.data, queryProps.data]);

  return (
    <Container padding={'0'} margin={'1rem 0'}>
      <TabPanelIml>
        <TabContext value={value}>
          <Container padding={'0 24px'}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label='lab API tabs example'
                textColor='secondary'
                indicatorColor='secondary'
                centered
              >
                <Tab label='Rooms' value='1' />
                <Tab label='Orders' value='2' />
                <Tab label='Change' value='3' />
                <Tab label='Create' value='4' />
              </TabList>
            </Box>
          </Container>
          <TabPanel value='1'>
            <EntityInfoPanel
              buttonFunction={queryProps.data ? queryProps.refetch : getRooms}
              buttonText={BUTTON_TEXT}
              isLoading={queryProps.loading}
              data={queryProps.data ? queryProps.data.getAllRooms : []}
              columns={ROOM_COLUMNS}
              onRowClickedHandler={onRoomRowClickHandler}
            />
          </TabPanel>
          <TabPanel value='2'>
            <EntityInfoPanel
              buttonFunction={
                orderProps.data ? orderProps.refetch : getOrderRooms
              }
              buttonText={BUTTON_TEXT}
              isLoading={orderProps.loading}
              data={orderProps.data ? orderProps.data.getAllOrderRooms : []}
              columns={ORDER_ROOM_COLUMNS}
              onRowClickedHandler={onRowClickHandler}
            />
          </TabPanel>
          <TabPanel value='3'>
            <ChangeRoomPage changeTab={setValue} />
          </TabPanel>
          <TabPanel value={'4'}>
            <CreateRoomPage changeTab={setValue} />
          </TabPanel>
        </TabContext>
      </TabPanelIml>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        margin={'-250px 0 0 0 '}
      >
        <Title>Deleting confirm</Title>
        <Flex minWidth={'90%'} margin={'2rem 0 0 0'}>
          <Submit
            minWidth={'30%'}
            onClick={() => {
              handleClosePopup();
            }}
          >
            Back
          </Submit>

          <DeleteButton
            minWidth={'30%'}
            onClick={() => {
              deleteRoomOrder({
                variables: {
                  id: deletingOrder._id,
                },
              });
              handleClosePopup();
            }}
            backgroundColor={'#da0000'}
          >
            {deletedRoomOrderProps.loading ? 'Loading...' : 'Delete'}
          </DeleteButton>
        </Flex>
      </Popup>
    </Container>
  );
};

export default RoomPage;
