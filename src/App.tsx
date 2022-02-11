import { Box, Card, CardContent, Container, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import Inventory from './Inventory';
import Navbar from './Navbar';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="xl">
        <br />
        <Card>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs aria-label="basic tabs example">
                <Tab label="Inventory" />
                <Tab label="Crafts" />
                <Tab label="Settings" />
                <Tab label="About" />
              </Tabs>
            </Box>
            <br />
            <Inventory />
          </CardContent> 
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;
