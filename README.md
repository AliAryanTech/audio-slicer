## audio-slicer
[![NPM](https://img.shields.io/badge/Available%20On-NPM-lightgrey.svg?logo=npm&logoColor=DA291A&labelColor=white&style=flat-square)](https://www.npmjs.com/package/audio-slicer)

A Node.js module to split audio files into segments. This module accepts audio data buffers as input and returns an array of Buffers representing the sliced audio segments.

### Installation
Before using the `audio-slicer` module, make sure to have `ffmpeg` installed on your system. You can install `audio-slicer` using npm or yarn:

```sh
npm install audio-slicer
```
or
```sh
yarn add audio-slicer
```

### Usage:
The `audio-slicer` module provides a function `audioToSlice(buffer, seconds, video)` that takes three parameters:

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

### Contribution
Contributions to the `audio-slicer` module are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request on the [GitHub repository](https://github.com/AliAryanTech/audio-slicer).

### Credits
The `audio-slicer` module is created and maintained by [AliAryanTech](https://github.com/AliAryanTech).
