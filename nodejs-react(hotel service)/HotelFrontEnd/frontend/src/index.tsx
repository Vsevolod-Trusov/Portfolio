import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { router } from './routing/router';
import { globalStyles } from './styles/global-styles';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { ThemeProvider } from './components/theme-provider/ThemeProvider';
import { store } from './redux/store/index.store';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Global = globalStyles();

const httpsLink = new HttpLink({ uri: 'https://lab:3000/graphql' }); //http://localhost:3000/graphql
const wssLink = new WebSocketLink({
  uri: `wss://lab:3000/graphql`, //ws://localhost:3000/graphql
  options: {
    reconnect: true,
  },
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.sessionStorage.getItem('token');
  // return the headers to the context so HTTP link can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wssLink,
  authLink.concat(httpsLink),
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider>
        <Global />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </ApolloProvider>,
);
