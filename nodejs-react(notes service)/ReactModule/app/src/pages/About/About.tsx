import { FC } from 'react';
import { Info, Add, LabelImportant } from '@mui/icons-material';
import { List, ListItemText, ListItem, Box } from '@mui/material';

import { Title } from 'components';

import {
  Wrapper,
  AboutWrapper,
  AboutContainer,
  StyledHeader,
  StyledInfoWrapper,
} from './styled';
import { FEATURES, FUTURES, FEATURES_AND_FUTURE, SOME_TEXT } from './constants';

const About: FC = () => (
  <Wrapper>
    <AboutWrapper>
      <AboutContainer>
        <StyledHeader>
          <Info fontSize={'large'} />
          <Title variant={'h1'}>{FEATURES_AND_FUTURE}</Title>
          <Title variant={'h2'}>{SOME_TEXT}</Title>
        </StyledHeader>
        <StyledInfoWrapper>
          <List>
            {FEATURES.map((name: string) => (
              <ListItem key={name}>
                <Box>
                  <LabelImportant />
                </Box>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
          <List>
            {FUTURES.map((name: string) => (
              <ListItem key={name}>
                <Box>
                  <Add />
                </Box>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </StyledInfoWrapper>
      </AboutContainer>
    </AboutWrapper>
  </Wrapper>
);

export default About;
