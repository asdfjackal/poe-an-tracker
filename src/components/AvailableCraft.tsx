import { Avatar, Badge, Button, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import PopupState, { bindTrigger } from 'material-ui-popup-state';
import { Modifier } from '../react-app-env';
import ModifierPopover from './ModifierPopover';

export default function AvailableCraft(props: {dataKey: string, value: Modifier, count: number, craft: Function}) {
  const {dataKey, value, count, craft} = props;
  return(
    <PopupState variant="popover" popupId={`${dataKey}-available-craft-popover`}>
      {
        (popupState) => (
          <>
            <ListItem
              key={dataKey}
              secondaryAction={
                <Button
                  variant="text"
                  onClick={(e) => {
                    e.stopPropagation()
                    craft()
                  }}
                >
                  Craft
                </Button>
              }
              disablePadding
              {...bindTrigger(popupState)}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Badge
                    badgeContent={count}
                  >
                    <Avatar src={process.env.PUBLIC_URL + `/images/archnemesis/${dataKey}.png`} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText primary={value.name} />
              </ListItemButton>
            </ListItem>
            <ModifierPopover modifier={value} popupState={popupState} />
          </>
        )
      }
    </PopupState>
  )
}