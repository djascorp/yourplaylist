import { AddTrackBtn } from '@/components/AddTrackBtn';
import { Stack } from 'expo-router';
import { useRefresh } from '@/hooks/useRefresh';

export default function PlaylistLayout() {
    console.log("Hello World")
    const { setRefreshTracks } = useRefresh();
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Mes Playlists ' }} />
            <Stack.Screen name="[id]" options={({ route }) => ({
                title: 'Détails de la Playlist',
                headerRight: () => <AddTrackBtn playlistId={route.params?.id} onTrackAdded={() => setRefreshTracks(true)}/>,
            })} />
        </Stack>
    );
}