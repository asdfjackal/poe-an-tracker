import { Avatar, Checkbox, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import PopupState, { bindTrigger } from 'material-ui-popup-state';
import { Modifier } from '../react-app-env';
import ModifierPopover from './ModifierPopover';

export default function FavoriteCraft(props: {dataKey: string, value: Modifier}) {
  const {dataKey, value} = props;
  return(
    <PopupState variant="popover" popupId={`${dataKey}-available-craft-popover`}>
      {
        (popupState) => (
          <>
            <ListItem
              key={dataKey}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                />
              }
              disablePadding
              {...bindTrigger(popupState)}
            >
              <ListItemButton>
                <ListItemAvatar>
                <Avatar src={process.env.PUBLIC_URL + `/images/archnemesis/${dataKey}.png`} />
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