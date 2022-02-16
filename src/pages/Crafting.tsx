import { Grid, List, Typography } from '@mui/material';
import AvailableCraft from '../components/AvailableCraft';
import FavoriteCraft from '../components/FavoriteCraft';
import TargetItem from '../components/TargetItem';
import { data } from '../data'
import { Modifier } from '../react-app-env';

export default function Crafting(props: {inventory: Map<string, number>, craft: Function, favorites: string[], toggleFavorite: Function}) {
  const { inventory, craft, favorites, toggleFavorite } = props


  const craftableMods = Array.from(data.entries()).filter(([key, value]) => (value.tier > 1)).sort((a, b) => a[1].name.localeCompare(b[1].name))
  const availableCrafts = craftableMods.map(([key, value]): [string, Modifier, number] => {
    const count = Math.min(...value.ingredients.map( ingredient => ((inventory.get(ingredient) as number) | 0)))
    return [key, value, count]
  }).filter(([key, value, count]) => count >= 1)

  function getBaseIngredients(key: string) {
    const item: Modifier = data.get(key)
    if(item.ingredients.length === 0) return key
    return (item.ingredients.reduce((list: string[], ingredient: string) => list.concat(getBaseIngredients(ingredient)), []))
  }

  const favoriteIngredients = favorites.reduce((list: string[], favorite: string) => [...list, ...getBaseIngredients(favorite)], [])
  console.log(favoriteIngredients)
  const targetKeys = Array.from(new Set(favoriteIngredients))

  console.log(targetKeys)
  // .map((item): [string, number] => [item, favoriteIngredients.filter((i) => i === item).length])

  const targetItems = Array.from(data.entries()).filter(([key, value]) => (targetKeys.includes(key))).map(([key, value]): [string, Modifier, number] => [key, value, favoriteIngredients.filter((i) => i === key).length])

  return (
    <Grid container columns={3} spacing={1}>
      <Grid item xs={1}>
        <Typography align="center">
          Available Crafts
        </Typography>
        <List dense={true}>
          {
            availableCrafts.map( ([key, value, count]) => (
              <AvailableCraft key={key} dataKey={key} value={value} count={count} craft={() => craft(key)} />
            ))
          }
        </List>
      </Grid>
      <Grid item xs={1}>
        <Typography align="center">
          Target Items
        </Typography>
        <List dense={true}>
          {
            targetItems.map( ([key, value, count]) => (
              <TargetItem key={key} dataKey={key} value={value} count={count} />
            ))
          }
        </List>
      </Grid>
      <Grid item xs={1}>
        <Typography align="center">
          Favorite Crafts
        </Typography>
        <List dense={true}>
          {
            Array.from(data.entries()).filter(([key, value]) => (value.tier > 1)).sort((a, b) => a[1].name.localeCompare(b[1].name)).map( ([key, value]) => (
              <FavoriteCraft key={key} dataKey={key} value={value} isFavorite={favorites.includes(key)} toggle={ () => toggleFavorite(key)} />
            ))
          }
        </List>
      </Grid>
  </Grid>
  )
}