import { Button, Label, ListItem, Slider, View, XStack, YStack } from "tamagui";
import { Music2, Pause, SkipBack, SkipForward } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";

export interface MusicPlayerProps {
    currentTime: number,
    duration: number,
    title?: string,
}


export const MusicSlider = ({ state }: { state: MusicPlayerProps }) => {
    return (
        <XStack justifyContent="center" gap={"$2"} $sm={{ flexDirection: 'column-reverse', alignItems: 'center', gap: '0' }} backgroundColor="$background">
            <View padding="$2">
                <ListItem title={state.title} icon={Music2} />
            </View>
            <XStack 
                gap="$4" 
                flex={1} 
                $sm={{ width: '100%' }} // Largeur maximale sur les petits écrans
            >
                <Label>{state.currentTime}</Label>
                <View flex={1} justifyContent="center">
                    <Slider defaultValue={[50]} max={100} step={1} orientation="horizontal">
                        <Slider.Track>
                            <Slider.TrackActive />
                        </Slider.Track>
                        <Slider.Thumb size="$1" index={0} circular />
                    </Slider>
                </View>
                <Label>{state.duration}</Label>
            </XStack>
        </XStack>
    );
}


export const MusicPlayer = () => {
    const [state, setState] = useState<MusicPlayerProps>({
        currentTime: 1,
        duration: 4.5,
        title: "Hello World"
    })

    useEffect(() => {
        console.log("RENDER PLAYER");
    },[])

    return (
        <YStack gap="$2" padding={"$2"}>
            <XStack gap="$3" alignSelf="center">
                <Button icon={SkipBack} size={"$3"} />
                <Button icon={Pause} size={"$3"} />
                <Button icon={SkipForward} size={"$3"} />
            </XStack>
            <MusicSlider state={state} />
        </YStack>
    )
}