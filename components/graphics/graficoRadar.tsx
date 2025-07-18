import { View, Text } from "react-native";
import { RadarChart } from "react-native-gifted-charts";

export default function GraficoRadar() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Gráfico DASS-21</Text>
      <RadarChart
        data={[60, 50, 50]}
        labels={['Estresse', 'Ansiedade', 'Depressão',]}
        maxValue={100}
      />
    </View>
  );
}