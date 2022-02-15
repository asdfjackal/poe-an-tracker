import PopupState, { bindTrigger } from 'material-ui-popup-state';
import { Avatar, Badge, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Modifier } from '../react-app-env';
import ModifierPopover from './ModifierPopover';

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
          <ModifierPopover modifier={modifier} popupState={popupState} />
        </div>
      )}
    </PopupState>
  )
}