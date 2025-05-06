import { Stack } from "expo-router";

export default function RootLayout() {
    return(
        <Stack>
            <Stack.Screen name="resultGeneral" options={{headerShown: false}} />

            <Stack.Screen name="resultCapc" options={{headerShown: false}} />
            <Stack.Screen name="resultDass" options={{headerShown: false}} />
            <Stack.Screen name="resultFfmq" options={{headerShown: false}} />
        </Stack>
    );
}