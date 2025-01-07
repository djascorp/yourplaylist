import { Stack } from 'expo-router';

export default function PlaylistLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Mes Playlists' }} />
            <Stack.Screen name="[id]" options={{ title: 'Détails de la Playlist' }} />
            <Stack.Screen name="create" options={{ title: 'Créer une Playlist' }} />
        </Stack>
    );
}