import * as ytStream from 'yt-stream';

/**
 * Interface for the information retrieved from a YouTube track.
 */
interface YouTubeTrackInfo {
  title: string;
  duration: number;
  author: string;
}

/**
 * Loads music information from a YouTube URL.
 * @param youtubeUrl - The YouTube video URL.
 * @returns A Promise that resolves to an object containing the title, duration, and author of the YouTube track.
 * @throws Error if fetching YouTube track information fails.
 */
async function getYouTubeTrackInfo(youtubeUrl: string): Promise<YouTubeTrackInfo> {
  try {
    const info = await ytStream.getInfo(youtubeUrl);

    const title = info.title || 'Unknown Title';
    const duration = parseInt(String(info.duration || '0'));
    const author = info.author || 'Unknown Artist';

    return { title, duration, author };
  } catch (error) {
    console.error('Error fetching YouTube track info:', error);
    throw new Error('Failed to fetch track info from YouTube.');
  }
}

export { getYouTubeTrackInfo };