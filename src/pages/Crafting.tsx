import { Avatar, Badge, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { data } from '../data'
import { Modifier } from '../react-app-env';

export default function Crafting(props: {inventory: Map<string, number>}) {
  const { inventory } = props


  const craftableMods = Array.from(data.entries()).filter(([key, value]) => (value.tier > 1))
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
              
              <ListItem
                key={key}
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Badge
                      badgeContent={count}
                    >
                      <Avatar src={process.env.PUBLIC_URL + `/images/archnemesis/${key}.png`} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText primary={value.name} />
                </ListItemButton>
              </ListItem>
            )

            )
          }
        </List>
      </Grid>
      <Grid item xs={1}>
        <Typography align="center">
          Favorite Crafts
        </Typography>
        <List dense={true}>
          {
            Array.from(data.entries()).filter(([key, value]) => (value.tier > 1)).map( ([key, value]) => (
              
              <ListItem
                key={key}
                secondaryAction={
                  <Checkbox
                    edge="end"
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                  <Avatar src={process.env.PUBLIC_URL + `/images/archnemesis/${key}.png`} />
                  </ListItemAvatar>
                  <ListItemText primary={value.name} />
                </ListItemButton>
              </ListItem>
            )

            )
          }
        </List>
      </Grid>
  </Grid>
  )
}