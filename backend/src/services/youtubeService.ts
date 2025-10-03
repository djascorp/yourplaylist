import * as ytStream from 'yt-stream';

interface YouTubeTrackInfo {
  title: string;
  duration: number;
  author: string;
}

/**
 * Loads music information from a YouTube URL.
 * @param youtubeUrl - The YouTube video URL.
 * @returns The music information.
 */
async function getYouTubeTrackInfo(youtubeUrl: string): Promise<YouTubeTrackInfo> {
  try {
    const info = await ytStream.getInfo(youtubeUrl);

    const title = info.title || 'Unknown Title';
    const duration = parseInt(info.duration || '0');
    const author = info.author || 'Unknown Artist';

    return { title, duration, author };
  } catch (error) {
    console.error('Error fetching YouTube track info:', error);
    throw new Error('Failed to fetch track info from YouTube.');
  }
}

export { getYouTubeTrackInfo };
