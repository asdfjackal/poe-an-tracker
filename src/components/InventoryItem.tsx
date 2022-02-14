import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Avatar, Badge, IconButton, ListItem, ListItemAvatar, ListItemText, Popover, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Modifier } from '../react-app-env';
import data from '../data.json'
import { useState } from 'react';

export default function InventoryItem(props: {dataKey: string, modifier: Modifier, count: number, increment: Function, decrement: Function}) {
  const {dataKey, modifier, count, increment, decrement} = props

  return(
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <ListItem
            secondaryAction={
              <>
              <IconButton edge="end" aria-label="decrement" onClick={(e) => {
                e.stopPropagation()
                decrement()
              }}>
                <RemoveIcon />
              </IconButton>
              <IconButton edge="end" aria-label="increment" onClick={(e) => {
                e.stopPropagation()
                increment()
              }}>
                <AddIcon />
              </IconButton>
              </>
            }
            {...bindTrigger(popupState)}
          >
            <ListItemAvatar>
              <Badge
                badgeContent={count}
              >
                <Avatar src={process.env.PUBLIC_URL + `/images/archnemesis/${dataKey}.png`} />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={modifier.name}
            />
          </ListItem>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ px: 2 }} variant="body2">
              <p>{modifier.description}</p>
              {modifier.extra ? (<p>{modifier.extra}</p>) : null}
              <p>Rewards</p>
              <ul>
                {modifier.rewards.map((reward: string) => (
                  <li>{reward}</li>
                ))}
              </ul>
              {modifier.ingredients.length !== 0 ? (
                <>
                  <p>Ingredients:</p>
                  <ul>
                    {modifier.ingredients.map((key: string) => (
                      <li>{(data as any)[key].name}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {modifier.used_in.length !== 0 ? (
                <>
                  <p>Used In:</p>
                  <ul>
                    {modifier.used_in.map((key: string) => (
                      <li>{(data as any)[key].name}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}