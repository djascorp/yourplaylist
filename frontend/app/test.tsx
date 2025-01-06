import { Text, View } from "react-native";
import {  Audio } from "expo-av";
import { Button, Input, YStack } from "tamagui";
import { useRef, useState } from "react";

export default function TestScreen(){

    const playback =  new  Audio.Sound();
    const [ytUrl,setYtUrl] = useState("");

    const playSound = async () => {
        if(ytUrl){
            const music = await playback.loadAsync({
                uri: `http://localhost:3000/api/tracks/stream?url=${ytUrl}`
            });
            console.log("MUSIC", music);
            await playback.playAsync();
        }
    }

    const pauseSound = async () => {
        await playback.pauseAsync();
    }

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text>Test Audio Player</Text>
            <YStack justifyContent="center" alignItems="center" flex={1}>
            <Input value={ytUrl} onChangeText={value => setYtUrl(value)} />
            <Button onPress={playSound}>Play Source</Button>
            <Button onPress={pauseSound}>Pause Source</Button>
            </YStack>
            
        </View>
    )
}