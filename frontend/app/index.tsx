import { Button, YStack, View, Text } from "tamagui";
import MusicPlayer from "@/components/MusicPlayer";
import { Link } from "expo-router";
import { useToastController } from "@tamagui/toast";

export default function Index() {
  const toast = useToastController()

  const onClick = () => {
    toast.show("Vous avez cliqué", {
      message: "Pourquoi vous avez cliqué"
    })
  }

  return (
    <YStack space="$10">
      <MusicPlayer />
      <Link href={"/test"} >
        <Button  width={"100%"}>Player Test</Button>
      </Link>

      <Link href={"/login"} replace={true} >
        <Button width={"100%"}>Login</Button>
      </Link>

    </YStack>
  );
}
