import { Button, Label, ListItem, Slider, View, XStack, YStack } from "tamagui";
import { Music2, Pause, Play, SkipBack, SkipForward } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { AudioStatus } from "expo-audio";
import { formaterDuree } from '@/utils/convert';

export interface MusicSliderProps {
    currentTime: number,
    duration: number,
    title?: string,
    author?: string, // New optional prop
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
        <XStack justifyContent="center" gap={"$3"} $sm={{ flexDirection: 'column', alignItems: 'center', gap: '$2' }} backgroundColor="$background" width="100%">
            <View padding="$2" flex={1} $sm={{ width: '100%'}}>
                <ListItem 
                    title={state.title} 
                    subTitle={state.author} 
                    icon={Music2} 
                    animation="quick"
                    enterStyle={{ opacity: 0 }}
                    opacity={1}
                />
            </View>
            <XStack
                gap="$3"
                alignItems="center"
                flex={1}
                $sm={{ width: '100%', paddingHorizontal: '$3' }} 
            >
                <Label minWidth={45} textAlign="center">{formaterDuree(state.currentTime)}</Label>
                <View flex={1} justifyContent="center">
                    <Slider defaultValue={[0]} value={[Math.round(state.currentTime)]} max={Math.round(state.duration)} step={1} orientation="horizontal" onValueChange={onSlide}>
                        <Slider.Track>
                            <Slider.TrackActive backgroundColor="$blue9" />
                        </Slider.Track>
                        <Slider.Thumb size="$1.5" index={0} circular />
                    </Slider>
                </View>
                <Label minWidth={45} textAlign="center">{formaterDuree(state.duration)}</Label>
            </XStack>
        </XStack>
    );
}

export interface MusicPlayerProps {
    status: AudioStatus, 
    title: string, 
    author?: string, // Added author
    onPrev: () => void,
    onNext: () => void,
    onPause: () => void,
    onPlay: () => void,
    onSlide: (value:number) => void,
}
export const MusicPlayer = ({ status, title, author, onPrev, onNext, onPause, onPlay ,onSlide}: MusicPlayerProps) => {

    useEffect(() => {
        // console.log("RENDER PLAYER"); // Kept for dev purposes if needed
    }, [])

    return (
        <YStack gap="$3" padding={"$3"} alignItems="center" width="100%">
            <XStack gap="$4" alignSelf="center">
                <Button circular icon={SkipBack} size={"$4"} onPress={() => onPrev()} />
                {status.playing && <Button circular icon={Pause} size={"$4"} onPress={() => onPause()} /> }
                {!status.playing && <Button circular icon={Play} size={"$4"} onPress={() => onPlay()} /> }
                <Button circular icon={SkipForward} size={"$4"} onPress={() => onNext()} />
            </XStack>
            <MusicSlider 
                state={{ 
                    currentTime: status.currentTime, 
                    duration: status.duration, 
                    title: title,
                    author: author // Pass author to MusicSlider
                }} 
                onMusicSlide={onSlide} 
            />
        </YStack>
    )
}