import React from 'react';
import ContainerWithFontColor from '../../components/primitives/wrapper/ContainerWithFontColor';
import UserMain from '../UserPages/UserMain/UserMain';

const MainPage = () => {
  return (
    <ContainerWithFontColor padding={'10px 15px'}>
      <UserMain />
    </ContainerWithFontColor>
  );
};

export default MainPage;
