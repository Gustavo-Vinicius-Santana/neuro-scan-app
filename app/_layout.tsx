import { Stack } from "expo-router";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ 
        title: "Form",
        headerTitleStyle: { fontSize: 25 },
        headerTitleAlign: "center",
      }} />
      <Stack.Screen name="result" options={{
        title: "Result", 
        headerTitleStyle: { fontSize: 25 },
        headerTitleAlign: "center",
      }} />
    </Stack>
  );
}
