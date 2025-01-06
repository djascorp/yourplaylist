import { Button, YStack, View, Text } from "tamagui";
import MusicPlayer from "./components/MusicPlayer";
import { Link } from "expo-router";

export default function Index() {
  return (
    <YStack>
      <MusicPlayer />
      <Link href={"/test"} >Player Test</Link>
    </YStack>
  );
}
