import { Avatar, Chip } from "@mui/material";
import PopupState, { bindTrigger } from "material-ui-popup-state";
import { Modifier } from "../react-app-env";
import ModifierPopover from "./ModifierPopover";

export default function TargetItem(props: {
  dataKey: string;
  value: Modifier;
  color: boolean;
  setHovered: Function;
}) {
  const { dataKey, value, color, setHovered } = props;
  return (
    <PopupState
      variant="popover"
      popupId={`${dataKey}-available-craft-popover`}
    >
      {(popupState) => {
        return (
          <>
            <Chip
              onMouseEnter={() => {
                setHovered(dataKey);
              }}
              onMouseLeave={() => {
                setHovered(null);
              }}
              avatar={
                <Avatar
                  src={
                    process.env.PUBLIC_URL +
                    `/images/archnemesis/${dataKey}.png`
                  }
                />
              }
              color={color ? "primary" : undefined}
              label={value.name}
              variant={color ? undefined : "outlined"}
              {...bindTrigger(popupState)}
            />
            <ModifierPopover modifier={value} popupState={popupState} />
          </>
        );
      }}
    </PopupState>
  );
}
