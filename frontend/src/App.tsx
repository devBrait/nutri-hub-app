import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './utils/theme';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
