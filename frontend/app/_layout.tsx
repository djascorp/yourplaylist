import { Stack, useRouter } from "expo-router";
import { TamaguiProvider, Theme, View, YStack } from "tamagui";
import config from "@/tamagui.config";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useEffect, useRef } from "react";
import { ToastProvider, ToastViewport, useToastState, Toast } from "@tamagui/toast";

const CurrentToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;

    console.log("MAIN LOADED", count.current);
  });

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ToastProvider>
            <Stack screenOptions={{ headerShown: false }} />
          <ToastViewport flexDirection="column-reverse" top={4} right={2} />
          <CurrentToast />
        </ToastProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
