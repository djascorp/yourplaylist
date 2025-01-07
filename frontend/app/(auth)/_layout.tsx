import { useApp } from '@/hooks/useApp';
import { Redirect, Stack } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function AuthLayout() {
    const { logged } = useApp();

    if (logged) {
        return (
            <Redirect href="/playlists" />
        )
    }

    return (
        <Stack>
            <Stack.Screen name="login" options={{ title: 'Login' }} />
            <Stack.Screen name="register" options={{ title: 'Sign Up' }} />
        </Stack>
    );
}