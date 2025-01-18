import { Stack } from 'expo-router';

export default function PlaylistLayout() {
    return (
        <Stack >
            <Stack.Screen name="playlist/index" options={{ title: 'Mes Playlists ' }} />
            <Stack.Screen name="playlist/[id]" options={{ title: 'Détails de la Playlist' }} />
        </Stack>
    );
}