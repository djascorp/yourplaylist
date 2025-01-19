import React, { useState } from "react"
import { CirclePlus, ListPlus } from "@tamagui/lucide-icons"
import { Button, Input, Sheet, Spinner, View, XStack } from "tamagui"
import { useToastController } from "@tamagui/toast";
import { httpService as db } from "@/services/httpService";

export const AddTrackBtn = ({ playlistId, onTrackAdded }: { playlistId: number, onTrackAdded?: CallableFunction }) => {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(0);
    const [creating, setCreating] = useState(false);

    const [youtubeUrl, setYoutubeUrl] = useState("");

    const toast = useToastController();

    const openTrackModal = () => {
        setOpen(true);
        setYoutubeUrl("");
    }
    const addTrack = async () => {
        try {
            const response = await db.playlist.addTrack(playlistId, { youtube_url: youtubeUrl });

            if (onTrackAdded) {
                onTrackAdded()
            }
            toast.show("Succès", { message: "Zik Ajouté à la playlist" });
            setOpen(false);
            setYoutubeUrl("");
        } catch (error) {
            toast.show("Erreur", { message: (error as { message: string }).message })
        }
    }

    return (
        <>
            <View paddingHorizontal={"2"}>
                <Button icon={CirclePlus} size="$2" onPress={openTrackModal} ></Button>
            </View>

            <Sheet
                forceRemoveScrollEnabled={open}
                open={open}
                onOpenChange={setOpen}
                position={position}
                onPositionChange={setPosition}
                animation={"medium"}
                zIndex={100_000}
            >
                <Sheet.Overlay
                    animation="lazy"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />

                <Sheet.Handle />
                <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" gap="$5">
                    <XStack gap={"$2"}>
                        <Input size={"$3"} placeholder='Lien du zik Youtube' onChangeText={text => setYoutubeUrl(text)} value={youtubeUrl}></Input>
                        <Button size={"$3"} icon={creating ? Spinner : ListPlus} variant='outlined' onPress={addTrack} disabled={creating}>
                        </Button>
                    </XStack>
                </Sheet.Frame>
            </Sheet>
        </>
    )
}