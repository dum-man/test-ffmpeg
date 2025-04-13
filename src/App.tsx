import "./App.css";
import AudioRecorder from "./components/AudioRecordingComponent";

function getPreferredAudioMimeType(): string {
  if (MediaRecorder.isTypeSupported("audio/mp4")) return "audio/mp4";
  if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus"))
    return "audio/webm;codecs=opus";
  if (MediaRecorder.isTypeSupported("audio/webm")) return "audio/webm";
  return "audio/webm";
}

function App() {
  return (
    <>
      <audio controls src="/audio/test.m4a" />
      <AudioRecorder
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress
        mediaRecorderOptions={{
          mimeType: getPreferredAudioMimeType(),
        }}
      />
    </>
  );
}

export default App;
