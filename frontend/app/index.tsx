import { Button, YStack, View, Text } from "tamagui";
import { MusicList } from "@/components/MusicList";
import { useToastController } from "@tamagui/toast";

export default function Index() {
  const toast = useToastController()

  const onClick = () => {
    toast.show("Vous avez cliqué", {
      message: "Pourquoi vous avez cliqué"
    })
  }

  return (
    <YStack flex={1}>
      <MusicList />
      {/* <Link href={"/test"} >
        <Button  width={"100%"}>Player Test</Button>
      </Link>

      <Link href={"/login"} replace={true} >
        <Button width={"100%"}>Login</Button>
      </Link> */}

    </YStack>
  );
}
