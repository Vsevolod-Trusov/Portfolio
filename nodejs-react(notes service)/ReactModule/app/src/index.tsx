import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { CookiesProvider } from 'react-cookie';

import router from 'components/Router';
import globalStyles from 'assets/styles';
import store from 'store/store';
import theme from 'config/constants/theme/theme';

const Global = globalStyles();

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <>
    <CookiesProvider>
      <Global />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={client}>
          <Provider store={store}>
            <SnackbarProvider>
              <RouterProvider router={router} />
            </SnackbarProvider>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </CookiesProvider>
  </>,
);
