import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Track } from "@/app/(main)/playlists/[id]";
import { atom, useAtom } from "jotai";
import { httpService as db } from "@/services/httpService";

export const currentTrackAtom = atom<Track>();
export const useMusicPlayer = () => {
  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);

  const [currentTrack, setCurrentTrackAtom] = useAtom(currentTrackAtom);
  const setCurrentTrack = (track: Track) => {
    setCurrentTrackAtom(track);

    // It's often a good practice to pause the player before replacing the source
    // to prevent any potential issues with playback state or resource handling.
    if(player.playing){
      pause();
    }
    player.replace({
      uri: db.track.getUrl(String(track.id)),
    });
    // Start playing the new track immediately
    play();
  };

  const play = () => {
    player.play();
  };

  const pause = () => {
    player.pause();
  };

  const to = (currentTime: number) => {
    player.seekTo(currentTime);
  };

  return {
    player,
    status,
    currentTrack,
    setCurrentTrack,
    play,
    pause,
    to,
  };
};
