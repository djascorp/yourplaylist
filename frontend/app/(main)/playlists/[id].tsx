import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { httpService as db } from '@/services/httpService';
import { View, Text, Spinner } from 'tamagui';
import { useToast } from '@tamagui/toast';
import { useRefresh } from '@/hooks/useRefresh';
import MusicList from '@/components/MusicList';
import { MusicPlayer } from '@/components/MusicPlayer';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

export interface Track {
    id: number,
    title: string,
    author: string,
    youtube_url: string,
    duration: number
}

export default function PlaylistDetail() {
    const { id } = useLocalSearchParams();
    const [tracks, setTracks] = useState<Track[]>([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    // const [showModal, setShowModal] = useState(false); // TODO: Remove or implement feature
    // const [youtubeUrl, setYoutubeUrl] = useState(''); // TODO: Remove or implement feature
    const { refreshTracks, setRefreshTracks } = useRefresh();
    const musicPlayer = useMusicPlayer()
    const toast = useToast();

    // const router = useRouter(); // TODO: Remove or implement feature


    const fetchTracks = async () => {
        try {
            const data = await db.playlist.getTracks(Number(id));
            setTracks(data);
        } catch (error) {
            console.error('Error fetching playlist:', error);
            toast.show('Failed to load playlist', {
              message: 'Please try again later.',
              type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    /**
     * Selects a track from the list and sets it as the current track for playback.
     * @param track The track object to be played.
     */
    const onMusicSelect = (track: Track) => {
        const index = tracks.findIndex((t) => t.id === track.id);
        if (index !== -1) {
            setCurrentTrackIndex(index);
            musicPlayer.setCurrentTrack(track);
        }
    };

    /**
     * Plays the next track in the playlist.
     * If the current track is the last one, it wraps around to the first track.
     */
    const onMusicNext = () => {
        if (tracks.length === 0) return; // No tracks to play

        const nextTrackIndex = currentTrackIndex !== null && currentTrackIndex < tracks.length - 1 
            ? currentTrackIndex + 1 
            : 0; // Wrap around to the first track

        setCurrentTrackIndex(nextTrackIndex);
        musicPlayer.setCurrentTrack(tracks[nextTrackIndex]);
    };

    /**
     * Plays the previous track in the playlist.
     * If the current track is the first one, it wraps around to the last track.
     */
    const onMusicPrev = () => {
        if (tracks.length === 0) return; // No tracks to play

        const prevTrackIndex = currentTrackIndex !== null && currentTrackIndex > 0 
            ? currentTrackIndex - 1 
            : tracks.length - 1; // Wrap around to the last track
            
        setCurrentTrackIndex(prevTrackIndex);
        musicPlayer.setCurrentTrack(tracks[prevTrackIndex]);
    };


    // Fetch tracks when the playlist ID changes
    useEffect(() => {
        fetchTracks();
    }, [id]);

    useEffect(() => {
        if (refreshTracks) {
            fetchTracks();
            setRefreshTracks(false)
        }

    }, [refreshTracks]);


    if (loading) {
        return <Spinner size="large" color="$blue10" />;
    }

    return (
        <View 
            flex={1} 
            padding="$4" 
            backgroundColor="$background"
            animation="quick"
            enterStyle={{ opacity: 0, y: 10 }}
            opacity={1}
            y={0}
        >
            <MusicList tracks={tracks} onPressTrack={onMusicSelect} active={musicPlayer.currentTrack?.id}>
                <MusicPlayer 
                    title={musicPlayer.currentTrack?.title || ''} 
                    author={musicPlayer.currentTrack?.author}
                    status={musicPlayer.status} 
                    onPlay={musicPlayer.play} 
                    onPause={musicPlayer.pause} 
                    onNext={onMusicNext} 
                    onPrev={onMusicPrev} 
                    onSlide={musicPlayer.to} 
                />
            </MusicList>
        </View>
    );
}