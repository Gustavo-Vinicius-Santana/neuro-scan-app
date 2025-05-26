import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("sensorData.db");

interface SensorRecord {
  id: number;
  formulario: string;
  numero_pergunta: number;
  sensor: string;
  eixo_x: number;
  eixo_y: number;
}

export default function ResultSensors() {
  const [dados, setDados] = useState<SensorRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await db.withTransactionAsync(async () => {
          const result = await db.getAllAsync<SensorRecord>(
            "SELECT * FROM sensor_data ORDER BY id DESC"
          );
          setDados(result);
        });
      } catch (error) {
        console.error("Erro ao buscar dados do sensor:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leituras do Sensor</Text>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>
              Pergunta {item.numero_pergunta} | {item.sensor.toUpperCase()}
            </Text>
            <Text style={styles.text}>
              X: {item.eixo_x.toFixed(2)} | Y: {item.eixo_y.toFixed(2)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  item: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
});