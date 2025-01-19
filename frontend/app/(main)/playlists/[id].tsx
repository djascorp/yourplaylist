import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { httpService as db } from '@/services/httpService';
import { AddTrackBtn } from '@/components/AddTrackBtn';
import { View, Text } from 'tamagui';
import { useRefresh } from '@/hooks/useRefresh';

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
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Contrôle l'affichage de la modal
    const [youtubeUrl, setYoutubeUrl] = useState(''); // Lien YouTube de la piste
    const {refreshTracks,setRefreshTracks} = useRefresh();

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



    // Charger les détails de la playlist depuis l'API
    useEffect(() => {
        fetchTracks();
    }, [id]);

    useEffect(() => {
        if(refreshTracks){
            fetchTracks();
            setRefreshTracks(false)
        }
        
    }, [refreshTracks]);


    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={tracks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 18 }}>{item.title}</Text>
                        <Text style={{ color: '#666' }}>{item.youtube_url}</Text>
                    </View>
                )}
            />
        </View>
    );
}