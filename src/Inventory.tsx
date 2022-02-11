import { Avatar, Badge, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import data from './data.json'

export default function Inventory(){
  const tiers = []
  for(let i=0; i<5; i++){
    tiers[i] = Object.entries(data).filter(([key, value]) => {
      return value.tier === i+1
    })
  }
  return (
        <Grid container columns={5} spacing={1}>
          {
            tiers.map((tier, index) => {
              return (
                <Grid item xs={1}>
                  <Typography align="center">
                    Tier {index+1}
                  </Typography>
                  <List dense={true}>
                    
                    {tier.map(([key, value]) => (
                      <ListItem
                        secondaryAction={
                          <>
                          <IconButton edge="end" aria-label="delete">
                            <RemoveIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete">
                            <AddIcon />
                          </IconButton>
                          </>
                        }
                      >
                        <ListItemAvatar>
                          <Badge
                            badgeContent={4}
                          >
                            <Avatar src={process.env.PUBLIC_URL + `/images/archnemesis/${key}.png`} />
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={value.name}
                        />
                      </ListItem>
                      
                    ))}
                  </List>
              
                </Grid>
              )
            })
          }
        </Grid>
  )
}