import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { httpService as db } from '@/services/httpService';

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

    

    // Fonction pour ajouter une piste
    const handleAddTrack = async () => {
        if (!youtubeUrl) {
            Alert.alert('Erreur', 'Veuillez entrer un lien YouTube.');
            return;
        }

        setLoading(true);

        try {
            // Envoyer une requête POST pour ajouter la piste
            const response = await db.playlist.addTrack(Number(id), {  youtubeUrl : '' , title : '' })

            // Afficher un message de succès
            Alert.alert('Succès', 'Piste ajoutée avec succès.');


            fetchTracks(); // Recharger la page pour afficher la nouvelle piste
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la piste:', error);
            Alert.alert('Erreur', error.response?.data?.message || 'Une erreur est survenue.');
        } finally {
            setLoading(false);
        }
    };

    // Charger les détails de la playlist depuis l'API
    useEffect(() => {
        fetchTracks();
    }, [id]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!tracks.length) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Playlist non trouvée.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>{playlist.name}</Text>

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