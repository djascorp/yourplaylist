import { Stack, useRouter } from "expo-router";
import { TamaguiProvider, Theme } from "tamagui";
import config from "@/tamagui.config";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useEffect, useRef } from "react";


export default function RootLayout() {
  const colorScheme = useColorScheme()
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current+1;

    console.log("MAIN LOADED", count.current);
  });

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
