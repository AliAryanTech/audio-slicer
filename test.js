const { audioToSlice } = require('./index')
const { readFile } = require('fs-extra')

const run = async () => {
  try {
    // Read the audio file as a buffer
    const audio = await readFile('./assets/audio.mp3')
    // Specify segment duration in seconds (e.g., 75 seconds)
    const seconds = 75
    // Call the audioToSlice function
    const buffers = await audioToSlice(audio, seconds)
    console.log(`Sliced into ${buffers.length} segments.`)
  } catch (error) {
    console.error('Error slicing audio:', error.message)
  }
}
run()
