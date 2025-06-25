import { Stack } from "expo-router";

export default function RootLayout() {
    return(
        <Stack>
            <Stack.Screen name="welcome" options={{headerShown: false}} />

            <Stack.Screen name="question1" options={{headerShown: false}} />
            <Stack.Screen name="question22" options={{headerShown: false}} />
        </Stack>
    )
}