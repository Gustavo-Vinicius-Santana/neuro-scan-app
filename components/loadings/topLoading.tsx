import { ActivityIndicator, View } from "react-native";

export function TopLoading({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 25,
        left: 0,
        right: 0,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        zIndex: 999,
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}