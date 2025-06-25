import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Platform } from "react-native";
import { initDatabase, isWeb } from "@/lib/database/db";

interface SensorRecord {
  id: number;
  formulario: string;
  numero_pergunta: number;
  sensor: string;
  eixo_x: number;
  eixo_y: number;
  eixo_z: number;
}

export default function ResultSensors() {
  const [dados, setDados] = useState<SensorRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await initDatabase();

        if (isWeb) {
          const res = db.exec("SELECT * FROM sensor_data ORDER BY id DESC");
          if (res.length > 0) {
            const { columns, values } = res[0];
            const data: SensorRecord[] = values.map((row: any[]) => {
              const obj: any = {};
              columns.forEach((col: string, i: number) => {
                obj[col] = row[i];
              });
              return obj as SensorRecord;
            });
            setDados(data);
          } else {
            setDados([]);
          }
        } else {
          await db.withTransactionAsync(async () => {
            const result = await db.getAllAsync(
              "SELECT * FROM sensor_data ORDER BY id DESC"
            );
            setDados(result as SensorRecord[]);
          });
        }
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
            <Text style={styles.text}>Formulário: {item.formulario}</Text>
            <Text style={styles.text}>Pergunta: {item.numero_pergunta}</Text>
            <Text style={styles.text}>Sensor: {item.sensor.toUpperCase()}</Text>
            <Text style={styles.text}>
              X: {item.eixo_x.toFixed(2)} | Y: {item.eixo_y.toFixed(2)} | Z:{" "}
              {item.eixo_z?.toFixed(2) ?? "0.00"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
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
  text: { fontSize: 16 },
});