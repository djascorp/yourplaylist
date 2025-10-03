import ytdl from '@distube/ytdl-core';
import { Readable } from 'stream';

/**
 * Gets the audio stream of a YouTube video.
 * @param youtubeUrl - The YouTube video URL.
 * @returns A Promise that resolves to a Readable stream of the audio.
 * @throws Error if fetching the audio stream from YouTube fails.
 */
async function getAudioStream(youtubeUrl: string): Promise<Readable> {
  try {
    const stream = ytdl(youtubeUrl, {
      filter: 'audioonly',
      quality: 'lowestaudio',
    });
    return stream;
  } catch (error) {
    console.error('Error getting audio stream:', error);
    throw new Error('Failed to get audio stream from YouTube.');
  }
}

export { getAudioStream };