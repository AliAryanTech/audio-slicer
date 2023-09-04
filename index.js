const { tmpdir } = require('os');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const fs = require('fs-extra');
const path = require('path');

const audioToSlice = async (buffer, seconds) => {
  if (!buffer || !seconds)
    throw new Error('Both audio buffer and seconds are required.');

  const filename = path.join(tmpdir(), `${new Date().getDate()}_${new Date().getTime()}.mp3`);
  await fs.writeFile(filename, buffer);
  try {
    const directory = 'temporary';
    await fs.ensureDir(directory);
    await exec(`ffmpeg -i ${filename} -f segment -segment_time ${seconds} -c:a libmp3lame ${directory}/audio_%03d.mp3`);
    const files = await fs.readdir(directory);
    const buffers = await Promise.all(files.map(x => fs.readFile(path.join(directory, x))));
    await Promise.all([fs.unlink(filename), fs.remove(directory)]);
    return buffers;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

module.exports = { audioToSlice }
