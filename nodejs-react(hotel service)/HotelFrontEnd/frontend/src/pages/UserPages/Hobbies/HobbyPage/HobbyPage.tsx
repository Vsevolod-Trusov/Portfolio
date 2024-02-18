import React, { useEffect, useState } from 'react';
import Container from '../../../../components/primitives/wrapper/Container';
import Flex from '../../../../components/primitives/flex/Flex';
import { useGetHobbyQuery } from './hobbyPage.generated';
import Title from '../../../../components/primitives/title/Title';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../../components/composites/Popup/Popup';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import Submit from '../../../../components/primitives/submit/Submit';

const flexProps = {
  margin: '1rem 0 0 0',
  flexDirection: 'column',
  alignItems: 'center',
};

const HobbyPage = () => {
  const navigate = useNavigate();
  const { data, error, loading } = useGetHobbyQuery({
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

  return (
    <Container>
      {data &&
        data.getAllHobbies.map((item: any) => (
          <Flex name={'hobbyFlex'} {...flexProps}>
            <Title>{item.leisureName}</Title>

            <Container
              width={'20rem'}
              textAlign={'center'}
              margin={'1rem 0 0 0'}
            >
              {item.description}
            </Container>

            <Container padding={'0'} color={!item.price ? '#19b413' : '#000'}>
              {item.price === 0 ? 'Free booking' : `$${item.price}`}
            </Container>
          </Flex>
        ))}

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

export default HobbyPage;
