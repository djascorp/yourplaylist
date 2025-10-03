import { AddTrackBtn } from '@/components/AddTrackBtn';
import { Stack } from 'expo-router';
import { useRefresh } from '@/hooks/useRefresh';
import { Button, View, XStack } from 'tamagui';
import { RefreshCw } from '@tamagui/lucide-icons';

export default function PlaylistLayout() {
    console.log("Hello World")
    const { setRefreshTracks } = useRefresh();
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Mes Playlists ' }} />
            <Stack.Screen name="[id]" options={({ route }) => ({
                title: 'Détails de la Playlist',
                headerRight: () => (
                    <XStack paddingHorizontal="$4" gap="$2">
                        <Button size={"$2"} icon={RefreshCw} onPress={() => setRefreshTracks(true)}></Button>
                        <AddTrackBtn playlistId={route.params?.id} onTrackAdded={() => setRefreshTracks(true)} />
                    </XStack>
                ),
            })} />
        </Stack>
    );
}