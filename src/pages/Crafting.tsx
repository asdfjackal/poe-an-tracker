import { Grid, List, Typography } from '@mui/material';
import AvailableCraft from '../components/AvailableCraft';
import FavoriteCraft from '../components/FavoriteCraft';
import { data } from '../data'
import { Modifier } from '../react-app-env';

export default function Crafting(props: {inventory: Map<string, number>, craft: Function}) {
  const { inventory, craft } = props


  const craftableMods = Array.from(data.entries()).filter(([key, value]) => (value.tier > 1)).sort((a, b) => a[1].name.localeCompare(b[1].name))
  const availableCrafts = craftableMods.map(([key, value]): [string, Modifier, number] => {
    const count = Math.min(...value.ingredients.map( ingredient => ((inventory.get(ingredient) as number) | 0)))
    return [key, value, count]
  }).filter(([key, value, count]) => count >= 1)

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
          Favorite Crafts
        </Typography>
        <List dense={true}>
          {
            Array.from(data.entries()).filter(([key, value]) => (value.tier > 1)).sort((a, b) => a[1].name.localeCompare(b[1].name)).map( ([key, value]) => (
              <FavoriteCraft key={key} dataKey={key} value={value} />
            ))
          }
        </List>
      </Grid>
  </Grid>
  )
}