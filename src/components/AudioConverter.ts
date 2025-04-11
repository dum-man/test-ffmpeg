import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export class AudioConverter {
  private BASE_URL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";

  private ffmpeg = new FFmpeg();

  private loadingPromise: Promise<boolean> | null;

  constructor() {
    this.loadingPromise = null;
  }

  isLoaded() {
    return this.ffmpeg.loaded;
  }

  async load() {
    if (!this.loadingPromise) {
      this.loadingPromise = (async () => {
        return this.ffmpeg.load({
          coreURL: await toBlobURL(`${this.BASE_URL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(
            `${this.BASE_URL}/ffmpeg-core.wasm`,
            "application/wasm"
          ),
        });
      })();
    }
    return this.loadingPromise;
  }

  async convert(blob: Blob) {
    if (!this.isLoaded()) {
      await this.load();
    }

    this.ffmpeg.writeFile("input.wav", await fetchFile(blob));

    await this.ffmpeg.exec([
      "-i",
      "input.wav",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      "output.m4a",
    ]);

    const fileData = await this.ffmpeg.readFile("output.m4a");

    const file = new File([fileData], crypto.randomUUID(), {
      type: "audio/m4a",
    });

    return file;
  }
}
