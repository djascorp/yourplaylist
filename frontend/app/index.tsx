import { Button, YStack, View, Text } from "tamagui";
import { useToastController } from "@tamagui/toast";
import { Link } from "expo-router";

export default function Index() {
  const toast = useToastController()

  const onClick = () => {
    toast.show("Vous avez cliqué", {
      message: "Pourquoi vous avez cliqué"
    })
  }

  return (
    <YStack flex={1} gap={"$2"}>
      {/* <MusicList /> */}
      <Link href={"/playlists"} replace>
        <Button  width={"100%"}>Playlist</Button>
      </Link>

      <Link href={"/test"} >
        <Button  width={"100%"}>Player Test</Button>
      </Link>

      <Link href={"/login"} replace={true} >
        <Button width={"100%"}>Login</Button>
      </Link>

    </YStack>
  );
}
