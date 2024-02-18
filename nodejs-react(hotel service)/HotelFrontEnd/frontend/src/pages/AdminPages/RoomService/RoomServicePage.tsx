import React, { useEffect, useState } from 'react';
import Container from '../../../components/primitives/wrapper/Container';
import { Box, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';
import { TabContext, TabPanel } from '@mui/lab';
import TabPanelIml from '../../../components/composites/TabPanel/TabPanelIml';
import {
  useDeleteServiceMutation,
  useGetServicesLazyQuery,
  useUpdateServiceMutation,
} from './data/roomService.generated';
import EntityInfoPanel from '../../../components/composites/EntityPanelInfo/EntityPanelInfo';
import { ROOM_SERVICE_COLUMNS } from './service.columns';
import { setChangingRoomServiceAction } from '../../../redux/reducers/room.reducer';
import { useDispatch, useSelector } from 'react-redux';
import ChangeForm, {
  ISelectedEntity,
} from '../../../components/composites/ChangeForm/ChangeForm';
import { checkPrice } from '../../../utils/form.cheks.utils';
import CreateServicePage from './CreateServicePage/CreateServicePage';
import Popup from '../../../components/composites/Popup/Popup';
import ErrorLine from '../../../components/primitives/errorLine/ErrorLine';
import Submit from '../../../components/primitives/submit/Submit';
import { SIGN_IN, UNAUTHORIZED } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export const BUTTON_TEXT = 'Update';
const SELECT_SERVICE = 'Select Service';

const AdminRoomServicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');
  const [getServices, queryProps] = useGetServicesLazyQuery();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [updateService, updatedServiceProps] = useUpdateServiceMutation();
  const [deleteService, deletedServiceProps] = useDeleteServiceMutation();

  const selectingService = useSelector(
    (state: any) => state.room.changingRoomService,
  );
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [IsErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const handleOpenErrorPopup = () => {
    setIsErrorPopupOpen(true);
  };

  const handleCloseErrorPopup = () => {
    setIsErrorPopupOpen(false);
  };

  useEffect(() => {
    if (queryProps.error) {
      if (queryProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [queryProps.error]);

  useEffect(() => {
    if (updatedServiceProps.error) {
      if (updatedServiceProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [updatedServiceProps.error]);

  useEffect(() => {
    if (deletedServiceProps.error) {
      if (deletedServiceProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [deletedServiceProps.error]);

  const onServiceRowClickHandler = (row: any) => {
    dispatch(
      setChangingRoomServiceAction({
        name: row.serviceName,
        price: row.servicePrice,
        description: row.serviceDescription,
      }),
    );
    setValue('2');
  };

  useEffect(() => {
    if (!queryProps.data) {
      getServices();
    }

    if (deletedServiceProps.data) {
      dispatch(setChangingRoomServiceAction({}));
      setValue('1');
    }
  }, [queryProps.data, deletedServiceProps.data]);

  const checkAndSend = (changingService: ISelectedEntity) => {
    if (!changingService.description) {
      setErrorMessage('Fill in description');
      return;
    }

    if (!checkPrice(changingService.price)) {
      setErrorMessage('Wrong price value');
      return;
    }

    updateService({
      variables: {
        service: {
          serviceName: changingService.name,
          serviceDescription: changingService.description,
          servicePrice: +changingService.price,
        },
      },
    });
    dispatch(
      setChangingRoomServiceAction({
        name: '',
        description: '',
        price: '',
      }),
    );
    setValue('1');
  };

  return (
    <Container margin={'1rem 0'}>
      <TabPanelIml>
        <TabContext value={value}>
          <Container margin={'0 24px'}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label='lab API tabs example'
                textColor='secondary'
                indicatorColor='secondary'
                centered
              >
                <Tab label='Services' value='1' />
                <Tab label='Change' value='2' />
                <Tab label='Create' value='3' />
              </TabList>
            </Box>
          </Container>
          <TabPanel value='1'>
            <EntityInfoPanel
              buttonFunction={
                queryProps.data ? queryProps.refetch : getServices
              }
              buttonText={BUTTON_TEXT}
              isLoading={queryProps.loading}
              data={queryProps.data ? queryProps.data.getAllRoomServices : []}
              columns={ROOM_SERVICE_COLUMNS}
              onRowClickedHandler={onServiceRowClickHandler}
            />
          </TabPanel>
          <TabPanel value={'2'}>
            <ChangeForm
              selectedEntity={selectingService}
              mock={SELECT_SERVICE}
              name={selectingService.name}
              price={selectingService.price}
              description={selectingService.description}
              dispatch={dispatch}
              setAction={setChangingRoomServiceAction}
              changeTab={setValue}
              graphqlDelete={deleteService}
              checkAndSend={checkAndSend}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </TabPanel>

          <TabPanel value={'3'}>
            <CreateServicePage changeTab={setValue} />
          </TabPanel>
        </TabContext>
      </TabPanelIml>

      <Popup
        isOpen={IsErrorPopupOpen}
        onClose={handleCloseErrorPopup}
        zIndex={'99'}
      >
        <ErrorLine backgroundColor={'transparent'}>
          {(queryProps.error && queryProps.error.message) ||
            (updatedServiceProps.error && updatedServiceProps.error.message) ||
            (deletedServiceProps.error && deletedServiceProps.error.message)}
        </ErrorLine>
        <Container>
          <Submit onClick={() => handleCloseErrorPopup()}>Ok</Submit>
        </Container>
      </Popup>
    </Container>
  );
};

export default AdminRoomServicePage;
