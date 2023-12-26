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

const audioMerge = async (audios) => {
    if (audios.length < 2) return audios[0] || [];
    try {
        const directory = 'temporary_merge';
        await fs.ensureDir(directory);
        audios.forEach(async (buffer, index) => {
            const filename = path.join(directory, `audio_${index}.mp3`);
            await fs.writeFile(filename, buffer);
        });
        const filename = path.join(tmpdir(), `${Math.random().toString(36)}.mp3`);
        const files = audios.map((_, index) => `-i ${path.join(directory, `audio_${index}.mp3`)}`).join(' ');
        await exec(
            `ffmpeg ${files} -filter_complex concat=n=${audios.length}:v=0:a=1 -strict -2 ${filename}`
        );
        const buffer = await fs.readFile(filename);
        await Promise.all([fs.unlink(filename), fs.remove(directory)]);
        return buffer;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

module.exports = { audioMerge, audioToSlice }
