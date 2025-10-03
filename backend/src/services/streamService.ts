import * as ytStream from 'yt-stream';
import { Readable } from 'stream';

/**
 * Gets the audio stream of a YouTube video.
 * @param youtubeUrl - The YouTube video URL.
 * @returns The audio stream.
 */
async function getAudioStream(youtubeUrl: string): Promise<Readable> {
  try {
    const stream = await ytStream.stream(youtubeUrl);
    return stream;
  } catch (error) {
    console.error('Error getting audio stream:', error);
    throw new Error('Failed to get audio stream from YouTube.');
  }
}

export { getAudioStream };
