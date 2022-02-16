import { Box, Card, CardContent, Container, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Routes, Route, Link} from 'react-router-dom';
import React, { useState } from 'react';
import Inventory from './pages/Inventory';
import Navbar from './Navbar';
import data from './data.json'
import Crafting from './pages/Crafting';

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

  const craft = (key: string) : boolean => {
    const recipe: string[] = (data as any)[key].ingredients
    console.log(recipe)
    let output = inventory
    const outputCount = output.get(key)
    if(outputCount === undefined) return false
    for(const i in recipe) {
      const ingredient = recipe[i]
      const count = output.get(ingredient)
      console.log("%d: %d", ingredient, count)
      if(count === undefined) return false
      if(count === 0) return false
      output = new Map(output.set(ingredient, count-1))
    }
    output = new Map(output.set(key, outputCount+1))
    updateInventory(output)
    return true
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
              <Tabs aria-label="Navigation Tabs">
                <Tab label="Inventory" value="/" to="/" component={Link} />
                <Tab label="Crafts" value="/crafting" to="/crafting" component={Link}  />
                <Tab label="Settings" value="/settings" to="/settings" component={Link}  />
                <Tab label="About" value="/about" to="/about" component={Link}  />
              </Tabs>
            </Box>
            <br />
            <Routes>
              <Route path="/" element={<Inventory
                  inventory={inventory}
                  increment={increment}
                  decrement={decrement}
                />} 
              />
              <Route path="/crafting" element={<Crafting
                  inventory={inventory}
                  craft={craft}
                />} 
              />
              <Route path="*" element={<Inventory
                  inventory={inventory}
                  increment={increment}
                  decrement={decrement}
                />} 
              />
              <Route path="*" element={<Inventory
                  inventory={inventory}
                  increment={increment}
                  decrement={decrement}
                />} 
              />
            </Routes>
            
          </CardContent> 
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;
