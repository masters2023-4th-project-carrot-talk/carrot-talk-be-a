import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import designSystem from './styles/designSystem';
import { globalStyle } from './styles/globalStyle';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import './utils/fcm';
// import { requestPermission } from './utils/fcm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // requestPermission(); // TODO test중. 로그인 시에만 허용하도록 변경

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={designSystem}>
        <Global styles={globalStyle} />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
