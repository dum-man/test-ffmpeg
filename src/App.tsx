import "./App.css";
import AudioRecorder from "./components/AudioRecordingComponent";

function App() {
  return (
    <AudioRecorder
      onNotAllowedOrFound={(err) => console.table(err)}
      downloadOnSavePress
    />
  );
}

export default App;
