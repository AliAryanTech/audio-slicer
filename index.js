const { tmpdir } = require('os');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const fs = require('fs-extra');
const path = require('path');

const audioToSlice = async (buffer, seconds, video = false) => {
  if (!buffer || !seconds)
    throw new Error('Both media buffer and seconds are required.');
  
  const extension = video ? 'mp4' : 'mp3'
  const options = video ? '-reset_timestamps 1' : '-c:a libmp3lame'
  const filename = path.join(tmpdir(), `${Math.random().toString(36)}.${extension}`);
  await fs.writeFile(filename, buffer);
  try {
    const directory = 'temporary';
    await fs.ensureDir(directory);
    await exec(`ffmpeg -i ${filename} -f segment -segment_time ${seconds} ${options} ${directory}/document_%03d.${extension}`);
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
