import { Button, Label, ListItem, Slider, View, XStack, YStack } from "tamagui";
import { Music2, Pause, Play, SkipBack, SkipForward } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { AudioStatus } from "expo-audio";
import { formaterDuree } from '@/utils/convert';

export interface MusicSliderProps {
    currentTime: number,
    duration: number,
    title?: string,
}


export const MusicSlider = ({ state , onMusicSlide}: { state: MusicSliderProps, onMusicSlide?: (value: number) => void }) => {
    const onSlide = (data: number[]) => {
        if(data && data.length){
            if(onMusicSlide){
                onMusicSlide(data[0]);
            }
        }
    }

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
                <Label>{formaterDuree(state.currentTime)}</Label>
                <View flex={1} justifyContent="center">
                    <Slider value={[Math.round(state.currentTime)]} max={Math.round(state.duration)} step={1} orientation="horizontal" onValueChange={onSlide}>
                        <Slider.Track>
                            <Slider.TrackActive />
                        </Slider.Track>
                        <Slider.Thumb size="$1" index={0} circular />
                    </Slider>
                </View>
                <Label>{formaterDuree(state.duration)}</Label>
            </XStack>
        </XStack>
    );
}

export interface MusicPlayerProps {
    status: AudioStatus, 
    title: string, 
    onPrev: CallableFunction,
    onNext: CallableFunction,
    onPause: CallableFunction,
    onPlay: CallableFunction,
    onSlide: (value:number) => void,
}
export const MusicPlayer = ({ status, title, onPrev, onNext, onPause, onPlay ,onSlide}: MusicPlayerProps) => {

    useEffect(() => {
        console.log("RENDER PLAYER");
    }, [])

    return (
        <YStack gap="$2" padding={"$2"}>
            <XStack gap="$3" alignSelf="center">
                <Button icon={SkipBack} size={"$3"} onPress={() => onPrev()} />
                {status.playing && <Button icon={Pause} size={"$3"} onPress={() => onPause()} /> }
                {!status.playing && <Button icon={Play} size={"$3"} onPress={() => onPlay()} /> }
                <Button icon={SkipForward} size={"$3"} onPress={() => onNext()} />
            </XStack>
            <MusicSlider state={{ currentTime: status.currentTime, duration: status.duration, title: title }} onMusicSlide={onSlide} />
        </YStack>
    )
}