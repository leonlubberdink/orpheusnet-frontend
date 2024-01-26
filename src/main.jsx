import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { extendTheme } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import ToasterEl from './components/ToasterEl.jsx';
import { AuthProvider } from './context/AuthProvider';
import { GroupContextProvider } from './context/GroupContext.jsx';
import { colors, fonts } from './styles/styles.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const theme = extendTheme({ colors, fonts });

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToasterEl />
      <BrowserRouter>
        <GroupContextProvider>
          <AuthProvider>
            <ChakraProvider theme={theme} resetCSS={true}>
              <App />
            </ChakraProvider>
          </AuthProvider>
        </GroupContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
