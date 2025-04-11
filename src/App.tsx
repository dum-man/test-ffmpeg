import "./App.css";
import AudioRecorder from "./components/AudioRecordingComponent";

function App() {
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <AudioRecorder
      onRecordingComplete={(blob) => addAudioElement(blob)}
      // audioTrackConstraints={{
      //   noiseSuppression: true,
      //   echoCancellation: true,
      // }}
      onNotAllowedOrFound={(err) => console.table(err)}
      downloadFileExtension="mp3"
    />
  );
}

export default App;
