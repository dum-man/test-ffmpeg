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

/**
 * Usage: https://github.com/samhirtarif/react-audio-recorder#audiorecorder-component
 *
 *
 * @prop `onRecordingComplete` Method that gets called when save recording option is clicked
 * @prop `recorderControls` Externally initilize hook and pass the returned object to this param, this gives your control over the component from outside the component.
 * https://github.com/samhirtarif/react-audio-recorder#combine-the-useaudiorecorder-hook-and-the-audiorecorder-component
 * @prop `audioTrackConstraints`: Takes a {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings#instance_properties_of_audio_tracks subset} of `MediaTrackConstraints` that apply to the audio track
 * @prop `onNotAllowedOrFound`: A method that gets called when the getUserMedia promise is rejected. It receives the DOMException as its input.
 * @prop `downloadOnSavePress` If set to `true` the file gets downloaded when save recording is pressed. Defaults to `false`
 * @prop `downloadFileExtension` File extension for the audio filed that gets downloaded. Defaults to `mp3`. Allowed values are `mp3`, `wav` and `webm`
 * @prop `showVisualizer` Displays a waveform visualization for the audio when set to `true`. Defaults to `false`
 * @prop `classes` Is an object with attributes representing classes for different parts of the component
 */
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

    ffmpeg.writeFile("input.wav", await fetchFile(blob));

    await ffmpeg.exec(["-i", "input.wav", "-c:a", "aac", "-b:a", "192k", "output.m4a"]);

    const fileData = await ffmpeg.readFile("output.m4a");

    const file = new File([fileData], crypto.randomUUID(), {
      type: "audio/m4a",
    });

    return file;
  };

  const downloadBlob = async (blob: Blob): Promise<void> => {
    const downloadBlob = await convertToDownloadFileExtension(blob);
    const fileExt = "m4a";
    const url = URL.createObjectURL(downloadBlob);

    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${downloadBlob.name}.${fileExt}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
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
