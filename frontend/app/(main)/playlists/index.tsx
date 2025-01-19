import React, { useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { fetch } from 'expo/fetch';
import { View, Text, ListItem, Card, Paragraph, H5, Sheet, XStack, Input, Button, Spinner } from 'tamagui';
import { ListPlus } from '@tamagui/lucide-icons';
import { httpService as db } from '@/services/httpService';
import { useToastController } from '@tamagui/toast';

export interface Playlist {
    id: number,
    name: string,
    owner_id?: number,
    username?: string,
}

export default function Playlists() {
    const router = useRouter();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToastController();


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

    // Naviguer vers les détails d'une playlist
    const navigateToPlaylist = (id: number) => {
        router.push(`/playlists/${id}`);
    };


    const [playlistName, setPlaylistName] = useState("");
    const [position, setPosition] = React.useState(0);
    const [creating, setCreating] = React.useState(false);
    const [openNewPlaylist, setOpenNewPlaylist] = React.useState(false);
    const newPlaylist = () => {
        setOpenNewPlaylist(true);
    }

    const createPlaylist = async () => {
        try {
            setCreating(true);
            const response = await db.playlist.create({
                name: playlistName,
            });

            toast.show("Succès", { message: "Creation de Playlist Effectué" });
            setOpenNewPlaylist(false);
            fetchPlaylists()
        } catch (error) {
            toast.show("Erreur", { message: (error as { message: string }).message })
        }
        setCreating(false);
    }


    // Charger les playlists depuis l'API
    useEffect(() => {
        fetchPlaylists();
    }, []);


    if (loading) {
        return (
            <View flex={1} justifyContent='center' alignItems='center'>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Mes Playlists</Text>

                <FlatList
                    data={playlists}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (

                        <View padding={"$1"}>
                            <TouchableOpacity onPress={() => navigateToPlaylist(item.id)}>
                                <Card hoverTheme bordered>
                                    <Card.Header>
                                        <H5>{item.name}</H5>
                                        <Paragraph>{item.username}</Paragraph>
                                    </Card.Header>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <TouchableOpacity
                    onPress={newPlaylist}
                    style={{ marginTop: 16, padding: 16, backgroundColor: '#007bff', borderRadius: 8 }}
                >
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Créer une Playlist</Text>
                </TouchableOpacity>
            </View>
            <Sheet
                forceRemoveScrollEnabled={openNewPlaylist}
                open={openNewPlaylist}
                onOpenChange={setOpenNewPlaylist}
                zIndex={100_000}
                animation="medium"
                position={position}
                onPositionChange={setPosition}
            >
                <Sheet.Overlay
                    animation="lazy"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />

                <Sheet.Handle />
                <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" gap="$5">
                    <XStack gap={"$2"}>
                        <Input size={"$3"} placeholder='Nom du playlist' onChangeText={text => setPlaylistName(text)} value={playlistName}></Input>
                        <Button size={"$3"} icon={creating ? Spinner : ListPlus} variant='outlined' onPress={createPlaylist} disabled={creating}>
                        </Button>
                    </XStack>
                </Sheet.Frame>
            </Sheet>
        </>
    );
}