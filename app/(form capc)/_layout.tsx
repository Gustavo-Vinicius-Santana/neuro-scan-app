import { Stack } from "expo-router";

export default function RootLayout() {
    return(
        <Stack>
            <Stack.Screen name="welcome" options={{headerShown: false}} />

            <Stack.Screen name="question1" options={{headerShown: false}} />
            <Stack.Screen name="question2" options={{headerShown: false}} />
        </Stack>
    )
}