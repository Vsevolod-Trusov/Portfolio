import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { light } from '../../styles/thems/light';
import { dark } from '../../styles/thems/dark';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  let currentTheme = useSelector((state: any) => state.theme.isDark);

  return (
    <StyledThemeProvider theme={!currentTheme ? light : dark}>
      {children}
    </StyledThemeProvider>
  );
};
