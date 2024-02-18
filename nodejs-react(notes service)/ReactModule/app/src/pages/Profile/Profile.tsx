import { FC } from 'react';
import { Box } from '@mui/material';
import {
  FavoriteRounded,
  LanguageRounded,
  FacebookRounded,
  Twitter,
  Instagram,
} from '@mui/icons-material';

import { formatDate } from 'utils';
import { Title } from 'components';
import { profile } from 'assets/images';

import {
  ProfilePageWrapper,
  StyledProfileInfoWrapper,
  StyledProfileInfo,
  StyledImage,
  StyledImageWrapper,
  InfoWrapper,
  StyledContainer,
  ProfilePageContainer,
  StyledButton,
  StyledAddingInfoWrapper,
  StyledList,
  StyledProfileLink,
} from './styled';
import { LIKE_SUBMIT, FIELDS, MOCKED, HREFS } from './constants';
import { IProfile } from './types';

const Profile: FC<IProfile> = ({ firstname, lastname, email, birthday }) => (
  <ProfilePageWrapper>
    <ProfilePageContainer>
      <InfoWrapper>
        <Box>
          <StyledContainer>
            <StyledImageWrapper>
              <StyledImage src={profile} />
            </StyledImageWrapper>
          </StyledContainer>
        </Box>
        <StyledProfileInfoWrapper>
          <Box />
          <StyledProfileInfo>
            <Title variant={'h1'}>
              {firstname} {lastname}
            </Title>
            <Box>
              <Box>{email}</Box>
              <Box>{formatDate(new Date(birthday))}</Box>
            </Box>
          </StyledProfileInfo>
          <Box>
            <StyledButton variant={'contained'}>
              <FavoriteRounded />
              <Box>{LIKE_SUBMIT}</Box>
            </StyledButton>
          </Box>
        </StyledProfileInfoWrapper>
      </InfoWrapper>
      <StyledAddingInfoWrapper>
        <Box>
          <Title>{FIELDS.LOCATION}</Title>
          <StyledList>
            <Box>
              <LanguageRounded />
              <Box>{MOCKED.LOCATION}</Box>
            </Box>
          </StyledList>
        </Box>
        <Box>
          <Title>{FIELDS.CONNECT}</Title>
          <StyledList>
            <Box>
              <FacebookRounded />
              <Box>
                <StyledProfileLink to={HREFS.FACEBOOK}>
                  {MOCKED.FACEBOOK}
                </StyledProfileLink>
              </Box>
            </Box>
            <Box>
              <Twitter />
              <Box>
                <StyledProfileLink to={HREFS.TWITTER}>
                  {MOCKED.TWITTER}
                </StyledProfileLink>
              </Box>
            </Box>
            <Box>
              <Instagram />
              <Box>
                <StyledProfileLink to={HREFS.INSTAGRAM}>
                  {MOCKED.INSTAGRAM}
                </StyledProfileLink>
              </Box>
            </Box>
          </StyledList>
        </Box>
      </StyledAddingInfoWrapper>
    </ProfilePageContainer>
  </ProfilePageWrapper>
);

export default Profile;
