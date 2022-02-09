import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import Tooltip from '@mui/material/Tooltip';

export default function Speech(){
  const isSpeechEnabled = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  return (
    <Tooltip
      title={isSpeechEnabled ? "Enable Voice Control" : "Voice Control is not compatible with this browser"}
    >
      <span>
        <IconButton
          color="inherit"
          disabled={!isSpeechEnabled}
        >
          <MicIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}