import { Box, Card, CardContent, Container, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react';
import Inventory from './components/Inventory';
import Navbar from './Navbar';
import data from './data.json'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const savedState = localStorage.getItem('archnemesis-inventory')
  const [inventory, updateInventory] = useState(
    savedState === null ? new Map<string, number>(Object.keys(data).map(key => [key, 0])) : new Map<string, number>(Object.entries(JSON.parse(savedState)))
  )

  const increment = (key: string) => {
    const old = inventory.get(key)
    if (old === undefined) return
    const newInventory = new Map(inventory.set(key, old + 1))
    updateInventory(newInventory)
    localStorage.setItem('archnemesis-inventory', JSON.stringify(Object.fromEntries(newInventory.entries())))
  }

  const decrement = (key: string) => {
    const old = inventory.get(key)
    if (old === undefined) return
    if (old <= 0) return
    const newInventory = new Map(inventory.set(key, old - 1))
    updateInventory(newInventory)
    localStorage.setItem('archnemesis-inventory', JSON.stringify(Object.fromEntries(newInventory.entries())))
  }

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
            <Inventory
              inventory={inventory}
              increment={increment}
              decrement={decrement}
            />
          </CardContent> 
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;
