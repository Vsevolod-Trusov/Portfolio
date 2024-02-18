import React, { useEffect } from 'react';
import Container from '../../../components/primitives/wrapper/Container';
import TabPanelIml from '../../../components/composites/TabPanel/TabPanelIml';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';
import EntityInfoPanel from '../../../components/composites/EntityPanelInfo/EntityPanelInfo';
import { useGetTablesLazyQuery } from './data/place.generated';
import { BUTTON_TEXT } from '../RoomService/RoomServicePage';
import { TABLES_COLUMNS } from './place.columns';
import { setChangingTableAction } from '../../../redux/reducers/meal.reducer';
import { useDispatch } from 'react-redux';
import ChangeTablePage from './ChangeTablePage/ChangeTablePage';
import CreateTablePage from './CreateTablePage/CreateTablePage';
import { SIGN_IN, UNAUTHORIZED } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const PlacePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');
  const [getTables, queryProps] = useGetTablesLazyQuery();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onServiceRowClickHandler = (row: any) => {
    dispatch(
      setChangingTableAction({
        tableNumber: row.tableNumber,
        amountSeats: row.amountSeats,
      }),
    );
    setValue('2');
  };

  useEffect(() => {
    if (queryProps.error) {
      if (queryProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [queryProps.error]);

  useEffect(() => {
    if (!queryProps.data) {
      getTables();
    }
  }, [queryProps.data]);

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
                <Tab label='Tables' value='1' />
                <Tab label='Change' value='2' />
                <Tab label='Create' value='3' />
              </TabList>
            </Box>
          </Container>
          <TabPanel value='1'>
            <EntityInfoPanel
              buttonFunction={queryProps.data ? queryProps.refetch : getTables}
              buttonText={BUTTON_TEXT}
              isLoading={queryProps.loading}
              data={queryProps.data ? queryProps.data.getAllTables : []}
              columns={TABLES_COLUMNS}
              onRowClickedHandler={onServiceRowClickHandler}
            />
          </TabPanel>
          <TabPanel value={'2'}>
            <ChangeTablePage changeTab={setValue} />
          </TabPanel>

          <TabPanel value={'3'}>
            <CreateTablePage changeTab={setValue} />
          </TabPanel>
        </TabContext>
      </TabPanelIml>
    </Container>
  );
};

export default PlacePage;
