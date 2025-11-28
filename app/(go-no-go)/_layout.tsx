import { Stack } from "expo-router";

export default function RootLayout() {
    return(
        <Stack>
            <Stack.Screen name="welcome"options={{headerShown: false}} />

            <Stack.Screen name="test" options={{headerShown: false}} />
        </Stack>
    )
}