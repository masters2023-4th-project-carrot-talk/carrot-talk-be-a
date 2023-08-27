import { Global, ThemeProvider } from '@emotion/react';
import { TestPage } from '@pages/TestPage';
import designSystem from '@styles/designSystem';
import { globalStyle } from '@styles/globalStyle';

function App() {
  return (
    <ThemeProvider theme={designSystem}>
      <Global styles={globalStyle} />
      <TestPage></TestPage>
    </ThemeProvider>
  );
}

export default App;
