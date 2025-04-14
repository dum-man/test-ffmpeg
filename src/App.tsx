import "./App.css";
import AudioRecorder from "./components/AudioRecordingComponent";

function getPreferredAudioMimeType(): string {
  if (MediaRecorder.isTypeSupported("audio/mp4")) return "audio/mp4";
  if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus"))
    return "audio/webm;codecs=opus";
  if (MediaRecorder.isTypeSupported("audio/webm")) return "audio/webm";
  return "audio/webm";
}

const recordedFormat = getPreferredAudioMimeType();
const convertedFormat = "audio/mp4";

function App() {
  return (
    <>
      <h2>recorded format: {recordedFormat}</h2>
      <h2>convertedFormat: {convertedFormat}</h2>
      <AudioRecorder
        convertedFormat={convertedFormat}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress
        mediaRecorderOptions={{
          mimeType: recordedFormat,
        }}
      />
    </>
  );
}

export default App;
