import { Global, ThemeProvider } from '@emotion/react';
import { ModalTestPage } from '@pages/ModalTestPage';
import designSystem from '@styles/designSystem';
import { globalStyle } from '@styles/globalStyle';

function App() {
  return (
    <ThemeProvider theme={designSystem}>
      <Global styles={globalStyle} />
      <ModalTestPage></ModalTestPage>
    </ThemeProvider>
  );
}

export default App;
