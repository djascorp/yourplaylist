import {  View } from "react-native";
import { AudioSource, useAudioPlayer, useAudioPlayerStatus, useAudioSampleListener } from 'expo-audio'
import { Text,Button, Input, YStack } from "tamagui";
import { useEffect, useRef, useState } from "react";

export default function TestScreen() {
    const player = useAudioPlayer();
    const status = useAudioPlayerStatus(player);

    
    
    const [ytUrl, setYtUrl] = useState("");


    const playSound = async () => {
        const url = `http://localhost:3000/api/tracks/stream?url=${ytUrl}`
        player.replace({
            uri: url
        })
        player.play()
    }

    const pauseSound = async () => {
        player.pause()
    }


    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text>Test Audio Player </Text>
            <YStack justifyContent="center" alignItems="center" flex={1}>
                <Input value={ytUrl} onChangeText={value => setYtUrl(value)} />
                <Button onPress={playSound}>Play Source</Button>
                <Button onPress={pauseSound}>Pause Source</Button>
            </YStack>

        </View>
    )
}