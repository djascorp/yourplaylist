import { Stack } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function AuthLayout() {
    const count = useRef(0);

    useEffect(() => {
        count.current = count.current + 1;

        console.log("AUTH LOADED", count.current);
    });
    return (
        <Stack>
            <Stack.Screen name="login" options={{ title: 'Login' }} />
            <Stack.Screen name="register" options={{ title: 'Sign Up' }} />
        </Stack>
    );
}