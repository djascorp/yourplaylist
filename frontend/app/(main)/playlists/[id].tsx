import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { httpService as db } from '@/services/httpService';
import { View, Text } from 'tamagui';
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
    const [showModal, setShowModal] = useState(false); // Contrôle l'affichage de la modal
    const [youtubeUrl, setYoutubeUrl] = useState(''); // Lien YouTube de la piste
    const { refreshTracks, setRefreshTracks } = useRefresh();
    const musicPlayer = useMusicPlayer()

    const router = useRouter()


    const fetchTracks = async () => {
        try {
            const data = await db.playlist.getTracks(Number(id));
            setTracks(data);
        } catch (error) {
            console.error('Error fetching playlist:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour sélectionner une musique
    const onMusicSelect = (track: Track) => {
        const index = tracks.findIndex((t) => t.id === track.id);
        if (index !== -1) {
            setCurrentTrackIndex(index);
            musicPlayer.setCurrentTrack(track);
        }
    };

    // Fonction pour passer à la piste suivante
    const onMusicNext = () => {
        if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
            const nextTrackIndex = currentTrackIndex + 1;
            setCurrentTrackIndex(nextTrackIndex);
            musicPlayer.setCurrentTrack(tracks[nextTrackIndex]);
        } else if (currentTrackIndex === tracks.length - 1) {
            // Revenir au début de la liste si on est à la fin
            setCurrentTrackIndex(0);
            musicPlayer.setCurrentTrack(tracks[0]);
        }
    };

    // Fonction pour revenir à la piste précédente
    const onMusicPrev = () => {
        if (currentTrackIndex !== null && currentTrackIndex > 0) {
            const prevTrackIndex = currentTrackIndex - 1;
            setCurrentTrackIndex(prevTrackIndex);
            musicPlayer.setCurrentTrack(tracks[prevTrackIndex]);
        } else if (currentTrackIndex === 0) {
            // Aller à la fin de la liste si on est au début
            const lastTrackIndex = tracks.length - 1;
            setCurrentTrackIndex(lastTrackIndex);
            musicPlayer.setCurrentTrack(tracks[lastTrackIndex]);
        }
    };


    // Charger les détails de la playlist depuis l'API
    useEffect(() => {
        fetchTracks();
    }, [id]);

    useEffect(() => {
        if (refreshTracks) {
            fetchTracks();
            setRefreshTracks(false)
        }

    }, [refreshTracks]);


    return (
        <View style={{ flex: 1, padding: 16 }}>
            <MusicList tracks={tracks} onPressTrack={onMusicSelect} active={musicPlayer.currentTrack?.id}>
                <MusicPlayer title='' status={musicPlayer.status} onPlay={musicPlayer.play} onPause={musicPlayer.pause} onNext={onMusicNext} onPrev={onMusicPrev} onSlide={musicPlayer.to} />
            </MusicList>
        </View>
    );
}