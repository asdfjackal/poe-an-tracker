import MicIcon from "@mui/icons-material/Mic";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";

export default function Speech() {
  const isSpeechEnabled =
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
  return (
    <Tooltip
      title={
        isSpeechEnabled
          ? "Enable Voice Control"
          : "Voice Control is not compatible with this browser"
      }
    >
      <span>
        <Button
          variant="contained"
          disabled={!isSpeechEnabled}
          endIcon={<MicIcon />}
        >
          Enable Voice Control
        </Button>
      </span>
    </Tooltip>
  );
}
