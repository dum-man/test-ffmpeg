import { ReactElement, useEffect } from "react";
import useAudioRecorder from "../hooks/useAudioRecorder";
import { Props } from "./interfaces";

import micSVG from "../icons/mic.svg";
import pauseSVG from "../icons/pause.svg";
import resumeSVG from "../icons/play.svg";
import saveSVG from "../icons/save.svg";
import discardSVG from "../icons/stop.svg";
import "../styles/audio-recorder.css";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const BASE_URL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";

const AudioRecorder: (props: Props) => ReactElement = ({
  onNotAllowedOrFound,
  recorderControls,
  audioTrackConstraints,
  downloadOnSavePress = false,
  mediaRecorderOptions,
  classes,
}: Props) => {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
  } =
    recorderControls ??
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAudioRecorder(audioTrackConstraints, onNotAllowedOrFound, mediaRecorderOptions);

  const stopAudioRecorder: (save?: boolean) => void = () => {
    stopRecording();
  };

  const convertToDownloadFileExtension = async (blob: Blob) => {
    const ffmpeg = new FFmpeg();

    await ffmpeg.load({
      coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    const inputFile = blob.type.includes("webm") ? "input.webm" : "input.mp4";

    ffmpeg.writeFile(inputFile, await fetchFile(blob));

    await ffmpeg.exec([
      "-i",
      inputFile,
      "input.wav",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      "output.m4a",
      // "-c:a",
      // "aac",
      // "-b:a",
      // "128k",
      // "-profile:a",
      // "aac_low", // <-- критично для совместимости
      // "-movflags",
      // "faststart", // <-- переместить moov в начало
      // "-f",
      // "mp4", // <-- явно указать формат контейнера
      // "output.m4a",
    ]);

    const m4aData = await ffmpeg.readFile("output.m4a");
    const file = new File([m4aData], crypto.randomUUID(), {
      type: "audio/m4a",
    });

    return file;
  };

  const downloadBlob = async (blob: Blob): Promise<void> => {
    const downloadFile = await convertToDownloadFileExtension(blob);
    const url = URL.createObjectURL(downloadFile);

    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  useEffect(() => {
    if (recordingBlob && downloadOnSavePress) {
      void downloadBlob(recordingBlob);
    }
  }, [recordingBlob]);

  return (
    <div
      className={`audio-recorder ${isRecording ? "recording" : ""} ${
        classes?.AudioRecorderClass ?? ""
      }`}
      data-testid="audio_recorder"
    >
      <img
        src={isRecording ? saveSVG : micSVG}
        className={`audio-recorder-mic ${classes?.AudioRecorderStartSaveClass ?? ""}`}
        onClick={isRecording ? () => stopAudioRecorder() : startRecording}
        data-testid="ar_mic"
        title={isRecording ? "Save recording" : "Start recording"}
      />
      <span
        className={`audio-recorder-timer ${!isRecording ? "display-none" : ""} ${
          classes?.AudioRecorderTimerClass ?? ""
        }`}
        data-testid="ar_timer"
      >
        {Math.floor(recordingTime / 60)}:{String(recordingTime % 60).padStart(2, "0")}
      </span>
      <span
        className={`audio-recorder-status ${!isRecording ? "display-none" : ""} ${
          classes?.AudioRecorderStatusClass ?? ""
        }`}
      >
        <span className="audio-recorder-status-dot"></span>
        Recording
      </span>
      <img
        src={isPaused ? resumeSVG : pauseSVG}
        className={`audio-recorder-options ${!isRecording ? "display-none" : ""} ${
          classes?.AudioRecorderPauseResumeClass ?? ""
        }`}
        onClick={togglePauseResume}
        title={isPaused ? "Resume recording" : "Pause recording"}
        data-testid="ar_pause"
      />
      <img
        src={discardSVG}
        className={`audio-recorder-options ${!isRecording ? "display-none" : ""} ${
          classes?.AudioRecorderDiscardClass ?? ""
        }`}
        onClick={() => stopAudioRecorder(false)}
        title="Discard Recording"
        data-testid="ar_cancel"
      />
    </div>
  );
};

export default AudioRecorder;
