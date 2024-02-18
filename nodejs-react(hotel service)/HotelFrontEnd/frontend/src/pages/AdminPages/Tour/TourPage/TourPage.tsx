import React, { useEffect, useReducer, useState } from 'react';
import Container from '../../../../components/primitives/wrapper/Container';
import TabPanelIml from '../../../../components/composites/TabPanel/TabPanelIml';
import TabContext from '@mui/lab/TabContext';
import { Box, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DataTableImpl from '../../../../components/composites/DataTable/DataTable';
import DataTable from 'react-data-table-component';
import { ORDER_TOUR_COLUMNS, TOUR_COLUMNS } from './tour.columns';
import {
  useDeleteOneTourMutation,
  useDeleteTourOrderMutation,
  useTourOrdersLazyQuery,
  useToursLazyQuery,
  useUpdateTourMutation,
} from './data/tour.generated';
import Flex from '../../../../components/primitives/flex/Flex';
import Form from '../../../../components/primitives/form/Form';
import Title from '../../../../components/primitives/title/Title';
import Input from '../../../../components/primitives/input/generic-input/Input';
import { inputProps } from '../../../../components/primitives/input/SignInLogin';
import TextArea from '../../../../components/primitives/textarea/TextArea';
import Submit from '../../../../components/primitives/submit/Submit';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAdminTourAction,
  setAdminToursAction,
  setTourOrderAction,
} from '../../../../redux/reducers/tour.reducer';
import { DateRangeInput } from '@datepicker-react/styled';
import { formatDate } from '../../../../utils/date.utils';
import CreateTourPage from '../CreateTour/CreateTourPage';
import DeleteButton from '../../../../components/primitives/submit/DeleteButton/DeleteButton';
import Popup from '../../../../components/composites/Popup/Popup';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { useNavigate } from 'react-router-dom';

const SELECT_TOUR = 'Select tour';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, focusedInput: action.payload };
    case 'DATE_CHANGE':
      return action.payload;
    default:
      throw new Error();
  }
}

const TourPage = () => {
  const navigate = useNavigate();
  const rootDispatch = useDispatch();
  const [getTours, queryProps] = useToursLazyQuery();
  const [getTourOrders, orderProps] = useTourOrdersLazyQuery();
  const [value, setValue] = React.useState('1');
  const adminSelectedTour = useSelector(
    (state: any) => state.tour.adminSelectedTour,
  );
  const selectedTourOrder = useSelector(
    (state: any) => state.tour.selectedTourOrder,
  );
  const tours = useSelector((state: any) => state.tour.adminTours);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [updateTour, { data, error, loading }] = useUpdateTourMutation();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [deleteTour, tourDeletedProps] = useDeleteOneTourMutation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deleteTourOrder, deletedOrderProps] = useDeleteTourOrderMutation();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
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
    if (orderProps.error) {
      if (orderProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [orderProps.error]);

  useEffect(() => {
    if (deletedOrderProps.error) {
      if (deletedOrderProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [deletedOrderProps.error]);

  useEffect(() => {
    if (tourDeletedProps.data) {
      rootDispatch(setAdminTourAction({}));
      setValue('1');
    }

    getTours();
    getTourOrders();
  }, [tours.length === 0, tourDeletedProps.data]);

  const initialState = {
    startDate: adminSelectedTour.startDate
      ? new Date(adminSelectedTour.startDate)
      : null,
    endDate: adminSelectedTour.endDate
      ? new Date(adminSelectedTour.endDate)
      : null,
    focusedInput: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRowClick = (selectedTour: any) => {
    setValue('3');
    dispatch({
      type: 'DATE_CHANGE',
      payload: {
        startDate: new Date(selectedTour.startDate),
        endDate: new Date(selectedTour.endDate),
      },
    });
    rootDispatch(setAdminTourAction(selectedTour));
  };

  if (queryProps.data) {
    rootDispatch(setAdminToursAction(queryProps.data.getAllTours));
  }

  const checkAndSend = () => {
    if (!adminSelectedTour.description) {
      setErrorMessage('Fill in description');
      return;
    }

    if (!+adminSelectedTour.tourPrice) {
      if (adminSelectedTour.tourPrice.length === 0) {
        setErrorMessage('Wrong price value');
        return;
      }

      if (+adminSelectedTour.tourPrice !== 0) {
        setErrorMessage('Wrong price value');
        return;
      }
    }

    if (
      new Date(adminSelectedTour.startDate).getTime() <
      new Date(formatDate(Date.now())).getTime()
    ) {
      setErrorMessage('Wrong dates value');
      return;
    }

    if (
      new Date(adminSelectedTour.startDate).getTime() >
      new Date(adminSelectedTour.endDate).getTime()
    ) {
      setErrorMessage('Wrong dates value');
      return;
    }

    updateTour({
      variables: {
        tour: {
          tourName: adminSelectedTour.tourName,
          description: adminSelectedTour.description,
          startDate: adminSelectedTour.startDate,
          endDate: adminSelectedTour.endDate,
          tourPrice: +adminSelectedTour.tourPrice,
        },
      },
    });

    rootDispatch(setAdminTourAction({}));
    setValue('1');
  };

  const deleteOneTour = (name: string) => {
    deleteTour({
      variables: {
        name: name,
      },
    });
  };

  return (
    <Container margin={'1rem 0'}>
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
                <Tab label='Tours' value='1' />
                <Tab label='Orders' value='2' />
                <Tab label='Change' value='3' />
                <Tab label='Сreate' value='4' />
              </TabList>
            </Box>
          </Container>
          <TabPanel value='1'>
            <Flex justifyContent={'end'}>
              <Container>
                <Submit
                  onClick={() =>
                    queryProps.data ? queryProps.refetch() : getTours()
                  }
                >
                  Update
                </Submit>
              </Container>
            </Flex>
            <DataTableImpl>
              {queryProps.loading ? (
                'Loading'
              ) : (
                <DataTable
                  columns={TOUR_COLUMNS}
                  data={tours}
                  pagination
                  highlightOnHover
                  paginationRowsPerPageOptions={[5, 10, 15]}
                  onRowClicked={(row, event) => {
                    handleRowClick(row);
                  }}
                />
              )}
            </DataTableImpl>
          </TabPanel>
          <TabPanel value='2'>
            <Flex justifyContent={'end'}>
              <Container>
                <Submit
                  onClick={() =>
                    orderProps.data ? orderProps.refetch() : getTourOrders()
                  }
                >
                  Update
                </Submit>
              </Container>
            </Flex>
            <DataTableImpl>
              {orderProps.loading
                ? 'Loading'
                : orderProps.data &&
                  orderProps.data.getAllOrderTours && (
                    <DataTable
                      columns={ORDER_TOUR_COLUMNS}
                      data={orderProps.data.getAllOrderTours}
                      pagination
                      highlightOnHover
                      paginationRowsPerPageOptions={[5, 10, 15]}
                      onRowClicked={(row) => {
                        handleOpenPopup();
                        rootDispatch(setTourOrderAction(row));
                      }}
                    />
                  )}
            </DataTableImpl>
          </TabPanel>
          <TabPanel value='3'>
            <Form maxWidth={'90%'} minHeight={'100%'} display={'flex'}>
              {Object.keys(adminSelectedTour).length === 0 ? (
                SELECT_TOUR
              ) : (
                <Flex
                  flexDirection={'column'}
                  alignItems={'center'}
                  minWidth={'100%'}
                >
                  <Title>{adminSelectedTour.tourName}</Title>
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
                        value={adminSelectedTour.tourPrice}
                        {...inputProps}
                        onChange={(e) => {
                          rootDispatch(
                            setAdminTourAction({
                              ...adminSelectedTour,
                              tourPrice: e.target.value,
                            }),
                          );
                        }}
                      />
                    </Container>
                  </Flex>

                  <Flex
                    justifyContent={'space-between'}
                    minWidth={'70%'}
                    margin={'1rem auto'}
                  >
                    <Flex justifyContent={'center'} alignItems={'center'}>
                      Date:
                    </Flex>
                    <Container padding={'0'}>
                      <DateRangeInput
                        onDatesChange={(data) => {
                          dispatch({ type: 'DATE_CHANGE', payload: data });
                          rootDispatch(
                            setAdminTourAction({
                              ...adminSelectedTour,
                              startDate: formatDate(data.startDate),
                              endDate: formatDate(data.endDate),
                            }),
                          );
                        }}
                        onFocusChange={(focusedInput) =>
                          dispatch({
                            type: 'focusChange',
                            payload: focusedInput,
                          })
                        }
                        startDate={state.startDate} // Date or null
                        endDate={state.endDate} // Date or null
                        focusedInput={state.focusedInput} // START_DATE, END_DATE or null
                        minBookingDate={new Date(Date.now())}
                        vertical={window.innerWidth <= 767}
                        displayFormat={'dd/MM/yyyy'}
                      />
                    </Container>
                  </Flex>

                  <Flex minWidth={'90%'}>
                    <TextArea
                      name={'description'}
                      value={adminSelectedTour.description}
                      resize={'none'}
                      minWidth={'80%'}
                      minHeight={'110%'}
                      onChange={(e) => {
                        rootDispatch(
                          setAdminTourAction({
                            ...adminSelectedTour,
                            description: e.target.value,
                          }),
                        );
                      }}
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
                        setValue('1');
                      }}
                    >
                      Back
                    </Submit>

                    <DeleteButton
                      minWidth={'30%'}
                      onClick={() => {
                        deleteOneTour(adminSelectedTour.tourName);
                      }}
                      backgroundColor={'#da0000'}
                    >
                      Delete
                    </DeleteButton>

                    <Submit
                      minWidth={'30%'}
                      onClick={() => {
                        checkAndSend();
                      }}
                      onBlur={() => {
                        if (errorMessage) {
                          setErrorMessage('');
                        }
                      }}
                    >
                      Change Tour
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
          </TabPanel>
          <TabPanel value={'4'}>
            <CreateTourPage changeTab={setValue} />
          </TabPanel>
        </TabContext>
      </TabPanelIml>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        margin={'-350px 0 0 0 '}
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
              deleteTourOrder({
                variables: {
                  id: selectedTourOrder._id,
                },
              });
              handleClosePopup();
            }}
            backgroundColor={'#da0000'}
          >
            Delete
          </DeleteButton>
        </Flex>
      </Popup>

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

export default TourPage;
