import { Box, Card, CardContent, Container, Tab, Tabs } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Inventory from './pages/Inventory';
import Navbar from './Navbar';
import data from './data.json'
import Crafting from './pages/Crafting';
import ActionModal from './components/ActionModal';

enum ModalState {
  Add = 'a',
  Remove = 'r',
  Craft = 'c',
  None = ''
}

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const savedInventory = localStorage.getItem('archnemesis-inventory');
  const savedFavorites = localStorage.getItem('archnemesis-favorites');
  const location = useLocation()
  const [inventory, updateInventory] = useState(
    savedInventory === null ? new Map<string, number>(Object.keys(data).map(key => [key, 0])) : new Map<string, number>(Object.entries(JSON.parse(savedInventory)))
  )

  const [favorites, updateFavorites] = useState<string[]>(
    savedFavorites === null ? [] : JSON.parse(savedFavorites)
  )

  const [activeModal, setActiveModal] = useState(ModalState.None)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if(activeModal === ModalState.None){
        switch(e.key){
          case 'a':
            setActiveModal(ModalState.Add)
            break
          case 'r':
            setActiveModal(ModalState.Remove)
            break
          case 'c':
            setActiveModal(ModalState.Craft)
            break
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })

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
    let output = inventory
    const outputCount = output.get(key)
    if(outputCount === undefined) return false
    for(const i in recipe) {
      const ingredient = recipe[i]
      const count = output.get(ingredient)
      if(count === undefined) return false
      if(count === 0) return false
      output = new Map(output.set(ingredient, count-1))
    }
    output = new Map(output.set(key, outputCount+1))
    updateInventory(output)
    localStorage.setItem('archnemesis-inventory', JSON.stringify(Object.fromEntries(output.entries())))
    return true
  }

  const toggleFavorite = (key: string) => {
    let newFavorites = []
    if(!favorites.includes(key)){
      newFavorites = [...favorites, key]
    }else{
      newFavorites = favorites.slice()
      newFavorites.splice(favorites.indexOf(key), 1)
    }
    updateFavorites(newFavorites)
    localStorage.setItem('archnemesis-favorites', JSON.stringify(newFavorites))
  }

  const closeModal = () => {
    setActiveModal(ModalState.None)
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
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Navbar />
      <Container maxWidth="xl" >
        <br />
        <Card>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={location.pathname} aria-label="Navigation Tabs">
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
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
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
      <ActionModal
        title="Add Item to Inventory"
        show={activeModal === ModalState.Add}
        action={increment}
        close={closeModal}
      />
      <ActionModal
        title="Remove Item from Inventory"
        show={activeModal === ModalState.Remove}
        action={decrement}
        close={closeModal}
      />
      <ActionModal
        title="Craft Item"
        show={activeModal === ModalState.Craft}
        action={craft}
        close={closeModal}
      />
    </ThemeProvider>
  );
}

export default App;
