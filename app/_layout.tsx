import { Stack } from "expo-router";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="sobre" options={{headerShown: false}}/>
      <Stack.Screen name="formInicial" options={{headerShown: false}}/>

      <Stack.Screen name="(form capc)" options={{headerShown: false}}/>
      <Stack.Screen name="(form ffmq)" options={{headerShown: false}}/>
      <Stack.Screen name="(forms dass)" options={{headerShown: false}}/>

      <Stack.Screen name="(results)" options={{headerShown: false}}/>
    </Stack>
  );
}
