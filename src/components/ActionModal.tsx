import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import data from "../data.json";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ActionModal(props: {
  title: string;
  show: boolean;
  action: Function;
  close: Function;
}) {
  const { title, show, action, close } = props;
  const [value, setValue] = useState<{ label: string; key: string } | null>(
    null
  );

  const options = Object.entries(data).map(([key, value]) => ({
    label: value.name,
    key,
  }));

  const submit = () => {
    if (value !== null) {
      action(value.key);
      close();
    }
  };

  return (
    <div>
      <Modal
        open={show}
        onClose={() => close()}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>

          <Autocomplete
            value={value}
            onChange={(
              event: any,
              newValue: { label: string; key: string } | null
            ) => {
              setValue(newValue);
            }}
            autoHighlight={true}
            autoSelect={true}
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Controllable" />
            )}
          />
          <Button variant="contained" onClick={() => submit()}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
