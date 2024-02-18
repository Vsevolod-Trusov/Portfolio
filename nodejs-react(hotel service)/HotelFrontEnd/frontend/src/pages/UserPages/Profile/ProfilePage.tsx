import React, { useEffect } from 'react';
import {
  PubSubDocument,
  useGetLastNewsLazyQuery,
  usePubSubSubscription,
} from './profileNews.generated';
import Container from '../../../components/primitives/wrapper/Container';
import { useSubscription } from '@apollo/client';
import Flex from '../../../components/primitives/flex/Flex';
import { useDispatch, useSelector } from 'react-redux';
import { setNewsAction } from '../../../redux/reducers/news.reducer';
import TabPanelIml from '../../../components/composites/TabPanel/TabPanelIml';
import TabContext from '@mui/lab/TabContext';
import { Box, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MealsInfoPanel from '../../AdminPages/Meal/MealsInfoPanel/MealsInfoPanel';
import OrderTableInfoPanel from '../../AdminPages/Meal/OrderTableInfoPanel/OrderTableInfoPanel';
import ChangeForm from '../../../components/composites/ChangeForm/ChangeForm';
import { setChangingMealAction } from '../../../redux/reducers/meal.reducer';
import CreateMealPage from '../../AdminPages/Meal/CreateMealPage/CreateMealPage';
import EntityInfoPanel from '../../../components/composites/EntityPanelInfo/EntityPanelInfo';
import { ROOM_TYPES_COLUMNS } from '../Room/SearchResultsRoom/roomTypes.columns';
import {
  setOrderPriceAction,
  setSelectRoomTypeAction,
} from '../../../redux/reducers/room.reducer';
import { NEWS_COLUMNS } from './contsnts';
import NewsContainer from './NewsContainer/NewsContainer';
import FeedbackContainer from '../Feedback/FeedbackContainer/FeedbackContainer';
import ProfileContainer from './ProfileContainer/ProfileContainer';

const ProfilePage = () => {
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
                <Tab label='Profile' value='1' />
                <Tab label='News' value='2' />
                <Tab label='Feedbacks' value='3' />
              </TabList>
            </Box>
          </Container>

          <TabPanel value={'1'}>
            <ProfileContainer />
          </TabPanel>

          <TabPanel value='2'>
            <NewsContainer />
          </TabPanel>

          <TabPanel value={'3'}>
            <FeedbackContainer />
          </TabPanel>
        </TabContext>
      </TabPanelIml>
    </Container>
  );
};

export default ProfilePage;

//{news &&
//         news.map((item: any, index: any) => (
//           <Container padding={'0'} key={index}>
//             <Flex flexDirection={'column'} alignItems={'center'}>
//               <Container padding={'0'}>{item.newsHeader}</Container>
//               <Container>{item.newsContent}</Container>
//               <Container>{item.newsDate.slice(0, 10)}</Container>
//             </Flex>
//           </Container>
//         ))}
