import React, { useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline, Button, Box } from '@mui/material';
import { theme } from './theme';
import LandingPage from './Component/LandingPage';

function App() {
  const [mode, setMode] = useState('light');
  const themeMode = useMemo(() => theme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
      <ThemeProvider theme={themeMode}>
          <CssBaseline />
          {/* Optional: Theme toggle button */}
          <Box sx={{ textAlign: 'center', m: 2 }}>
              <Button variant="contained" onClick={toggleTheme}>
                  Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
              </Button>
          </Box>
          <LandingPage />
      </ThemeProvider>
  );
}

export default App;