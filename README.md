## audio-slicer
[![NPM](https://img.shields.io/badge/Available%20On-NPM-lightgrey.svg?logo=npm&logoColor=DA291A&labelColor=white&style=flat-square)](https://www.npmjs.com/package/audio-slicer)

🎵 **audio-slicer** is a powerful Node.js module that enables you to **split** and **merge** audio files effortlessly. It accepts audio data buffers and processes them efficiently.

### ⚠️ **Install FFmpeg Before Using!**
Before using the `audio-slicer` module, make sure to have `ffmpeg` installed on your system.

### Installation
You can install `audio-slicer` using npm or yarn:

```sh
npm install audio-slicer
```
or
```sh
yarn add audio-slicer
```

### Usage:
The `audio-slicer` module provides two functions:

#### 1. `audioToSlice(buffer, seconds, video)`
- `buffer` (required): The audio data buffer you want to slice. This should be a Buffer containing the audio content you want to split.
- `seconds` (required): The duration of each segment in seconds.
- `video` (optional, default is false): A boolean indicating whether the media is video (true) or audio (false).

Here's an example usage:
```js
const { audioToSlice } = require('audio-slicer')
const { readFile } = require('fs-extra')

(async () => {
  try {
    // Read the media file as a buffer (can be audio or video)
    const media = await readFile('./media.mp4')
    // Specify segment duration in seconds (e.g., 60 seconds)
    const seconds = 60
    // Specify whether it's video (true) or audio (false)
    const video = true
    // Call the mediaToSlice function
    const buffers = await audioToSlice(media, seconds, video)
    console.log(`Sliced into ${buffers.length} segments.`)
  } catch (error) {
    console.error('Error slicing media:', error.message)
  }
})()
```

#### 2. `audioMerge(audios)`
- `audios` (required): An array of audio buffers to merge.

Here's an example usage:
```js
const { audioMerge } = require('audio-slicer')
const { readFile } = require('fs-extra')

(async () => {
  try {
    // Read multiple audio files as buffers
    const audio1 = await readFile('./audio1.mp3')
    const audio2 = await readFile('./audio2.mp3')
    const audio3 = await readFile('./audio3.mp3')

    // Create an array of audio buffers
    const audioBuffers = [audio1, audio2, audio3]

    // Call the audioMerge function
    const mergedBuffer = await audioMerge(audioBuffers)

    // Handle the merged audio buffer as needed
    console.log('Merged audio buffer:', mergedBuffer)
  } catch (error) {
    console.error('Error merging audio:', error.message)
  }
})()
```

### Contribution
Contributions to the `audio-slicer` module are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request on the [GitHub repository](https://github.com/AliAryanTech/audio-slicer).

### Credits
Developed & maintained by [**AliAryanTech**](https://github.com/AliAryanTech) 🚀
