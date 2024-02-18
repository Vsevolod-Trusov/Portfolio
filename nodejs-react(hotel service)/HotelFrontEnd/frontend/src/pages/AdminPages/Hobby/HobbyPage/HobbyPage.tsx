import React, { useEffect, useState } from 'react';
import Container from '../../../../components/primitives/wrapper/Container';
import TabPanelIml from '../../../../components/composites/TabPanel/TabPanelIml';
import TabContext from '@mui/lab/TabContext';
import { Box, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DataTableImpl from '../../../../components/composites/DataTable/DataTable';
import DataTable from 'react-data-table-component';
import {
  useChangeHobbyMutation,
  useDeleteOneHobbyMutation,
  useHobbiesLazyQuery,
} from './data/hobby.generated';
import { HOBBY_COLUMNS } from './hobby.columns';
import Flex from '../../../../components/primitives/flex/Flex';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHobbiesAction,
  setHobbyAction,
} from '../../../../redux/reducers/hobby.reducer';
import Submit from '../../../../components/primitives/submit/Submit';
import CreateHobbyPage from './CreateHobby/CreateHobbyPage';
import ChangeForm, {
  ISelectedEntity,
} from '../../../../components/composites/ChangeForm/ChangeForm';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { useNavigate } from 'react-router-dom';

const SELECT_HOBBY = 'Select hobby';

const HobbiesPage = () => {
  const navigate = useNavigate();
  const [getHobbies, queryLazyProps] = useHobbiesLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [updateHobby, queryUpdateProps] = useChangeHobbyMutation({
    fetchPolicy: 'no-cache',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [value, setValue] = React.useState('1');

  const dispatch = useDispatch();

  const selectedHobby = useSelector(
    (state: any) => state.hobbies.selectedHobby,
  );
  const hobbies = useSelector((state: any) => state.hobbies.hobbies);
  const [deleteHobby, deletedHobbyProps] = useDeleteOneHobbyMutation();

  useEffect(() => {
    if (deletedHobbyProps.data) {
      dispatch(setHobbyAction({}));
      setValue('1');
    }

    getHobbies();
  }, [hobbies.length === 0, deletedHobbyProps.data]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleRowClick = (selectedHobby: any) => {
    setValue('2');
    dispatch(
      setHobbyAction({ ...selectedHobby, name: selectedHobby.leisureName }),
    );
  };

  useEffect(() => {
    if (queryLazyProps.error) {
      if (queryLazyProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [queryLazyProps.error]);

  useEffect(() => {
    if (queryUpdateProps.error) {
      if (queryUpdateProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [queryUpdateProps.error]);

  if (queryLazyProps.data) {
    dispatch(setHobbiesAction(queryLazyProps.data.getAllHobbies));
  }

  const checkAndSend = (selectedHobby: ISelectedEntity) => {
    if (!selectedHobby.description) {
      setErrorMessage('Fill in description');
      return;
    }

    if (!+selectedHobby.price) {
      if (selectedHobby.price.length === 0) {
        setErrorMessage('Wrong price value');
        return;
      }

      if (+selectedHobby.price !== 0) {
        setErrorMessage('Wrong price value');
        return;
      }
    }

    updateHobby({
      variables: {
        hobby: {
          leisureName: selectedHobby.name,
          description: selectedHobby.description,
          price: +selectedHobby.price,
        },
      },
    });

    dispatch(
      setHobbyAction({
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
        <Container>
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
                  <Tab label='Hobbies' value='1' />
                  <Tab label='Change Hobby' value='2' />
                  <Tab label='Create' value='3' />
                </TabList>
              </Box>
            </Container>
            <TabPanel value='1'>
              <Flex justifyContent={'end'}>
                <Container>
                  <Submit
                    onClick={() =>
                      queryLazyProps.data
                        ? queryLazyProps.refetch()
                        : getHobbies()
                    }
                  >
                    Update
                  </Submit>
                </Container>
              </Flex>
              <DataTableImpl>
                {queryLazyProps.loading ? (
                  'Loading'
                ) : (
                  <DataTable
                    columns={HOBBY_COLUMNS}
                    data={hobbies}
                    pagination
                    highlightOnHover
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    onRowClicked={(row, event) => handleRowClick(row)}
                  />
                )}
              </DataTableImpl>
            </TabPanel>
            <TabPanel value='2'>
              <ChangeForm
                selectedEntity={selectedHobby}
                mock={SELECT_HOBBY}
                name={selectedHobby.leisureName}
                price={selectedHobby.price}
                description={selectedHobby.description}
                dispatch={dispatch}
                setAction={setHobbyAction}
                changeTab={setValue}
                graphqlDelete={deleteHobby}
                checkAndSend={checkAndSend}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel>
            <TabPanel value={'3'}>
              <CreateHobbyPage changeTab={setValue} />
            </TabPanel>
          </TabContext>
        </Container>
      </TabPanelIml>
    </Container>
  );
};

export default HobbiesPage;
