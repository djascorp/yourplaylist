import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { fetch } from 'expo/fetch';

export default function CreatePlaylist() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    // Créer une nouvelle playlist
    const handleCreatePlaylist = async () => {
        if (!name) {
            Alert.alert('Erreur', 'Veuillez entrer un nom pour la playlist.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/playlists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Indiquer que le corps est du JSON
                },
                body: JSON.stringify({ name }), // Convertir l'objet en chaîne JSON
            });
            const data = await response.json();
            Alert.alert('Succès', 'Playlist créée avec succès.');
            router.push('/playlists');
        } catch (error) {
            console.error('Error creating playlist:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la création de la playlist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Créer une Playlist</Text>

            <TextInput
                placeholder="Nom de la playlist"
                value={name}
                onChangeText={setName}
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 }}
            />

            <TouchableOpacity
                onPress={handleCreatePlaylist}
                disabled={loading}
                style={{ padding: 16, backgroundColor: '#007bff', borderRadius: 8 }}
            >
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                    {loading ? 'Création en cours...' : 'Créer'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}