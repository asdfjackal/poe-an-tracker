import { Grid, List, Typography } from '@mui/material';
import InventoryItem from './InventoryItem';
import { data } from '../data'

export default function Inventory(props: {inventory: any, increment: Function, decrement: Function}){
  const {inventory, increment, decrement} = props
  const tiers = []
  for(let i=0; i<5; i++){
    tiers[i] = Array.from(data.entries()).filter(([key, value]) => {
      return value.tier === i+1
    })
  }
  return (
    <Grid container columns={5} spacing={1}>
      {
        tiers.map((tier, index) => (
          <Grid item xs={1}>
            <Typography align="center">
              Tier {index+1}
            </Typography>
            <List dense={true}>
              
              {tier.map(([key, value]) => (
                <InventoryItem
                  key={key}
                  dataKey={key}
                  modifier={value}
                  count={inventory.get(key)}
                  increment={() => increment(key)}
                  decrement={() => decrement(key)}/>
              ))}
            </List>
          </Grid>
        ))
      }
    </Grid>
  )
}