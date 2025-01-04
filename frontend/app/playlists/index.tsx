import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { fetch } from 'expo/fetch';



export default function Playlists() {
    const router = useRouter();
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    // Charger les playlists depuis l'API
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/playlists');
                const data = await response.json();   
                setPlaylists(data);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    // Naviguer vers les détails d'une playlist
    const navigateToPlaylist = (id) => {
        router.push(`/playlists/${id}`);
    };

    // Naviguer vers l'écran de création d'une playlist
    const navigateToCreatePlaylist = () => {
        router.push('/playlists/create');
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Mes Playlists</Text>

            <FlatList
                data={playlists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigateToPlaylist(item.id)}
                        style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                    >
                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                onPress={navigateToCreatePlaylist}
                style={{ marginTop: 16, padding: 16, backgroundColor: '#007bff', borderRadius: 8 }}
            >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Créer une Playlist</Text>
            </TouchableOpacity>
        </View>
    );
}