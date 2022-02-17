import { Popover, Typography } from '@mui/material';
import { bindPopover } from 'material-ui-popup-state';
import { PopupState } from 'material-ui-popup-state/core';
import data from '../data.json'
import { Modifier } from '../react-app-env';

export default function ModifierPopover(props: {modifier: Modifier, popupState: PopupState}) {
  const {modifier, popupState} = props
  return (
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
            <li key={reward}>{reward}</li>
          ))}
        </ul>
        {modifier.ingredients.length !== 0 ? (
          <>
            <p>Ingredients:</p>
            <ul>
              {modifier.ingredients.map((key: string) => (
                <li key={key}>{(data as any)[key].name}</li>
              ))}
            </ul>
          </>
        ) : null}
        {modifier.used_in.length !== 0 ? (
          <>
            <p>Used In:</p>
            <ul>
              {modifier.used_in.map((key: string) => (
                <li key={key}>{(data as any)[key].name}</li>
              ))}
            </ul>
          </>
        ) : null}
      </Typography>
    </Popover>
  )
}