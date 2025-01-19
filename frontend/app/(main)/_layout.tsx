import { AddTrackBtn } from "@/components/AddTrackBtn";
import { useApp } from "@/hooks/useApp";
import { Redirect, Stack } from "expo-router";

export default function MainLayout(){
    const { logged } = useApp();

    if(!logged){
        return (
            <Redirect href="/login" />
        )
    }

    return (
        <Stack screenOptions={{headerShown : false}}/>
    )
}