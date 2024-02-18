import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import App from 'App';
import reportWebVitals from 'reportWebVitals';
import { BACKEND_URL } from 'common';

import { AppRouter } from '../../dashboard-server/src/main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: BACKEND_URL,
    }),
  ],
});

root.render(
  <StrictMode>
    <App />,
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
