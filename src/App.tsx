import "./App.css";
import AudioRecorder from "./components/AudioRecordingComponent";

function App() {
  return (
    <>
      <audio controls src="/src/assets/test.m4a" />
      <AudioRecorder
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress
      />
    </>
  );
}

export default App;
