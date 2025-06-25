import { useEffect } from "react";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { initDatabase } from "../database/db";
import { Platform } from "react-native";

type SensorType = "accelerometer" | "gyroscope";

interface SensorData {
  x: number;
  y: number;
  z: number;
}

export function useSensorLoggerMobile(
  formulario: string,
  numeroPergunta: number,
  sensor: SensorType
) {
  useEffect(() => {
    if (Platform.OS === "web") {
      // Não roda sensor mobile na web
      return;
    }

    let isCancelled = false;
    let subscription: any;

    const insertData = async (x: number, y: number) => {
      if (isCancelled) return;
      try {
        const db = await initDatabase();
        await db.runAsync(
          `INSERT INTO sensor_data (formulario, numero_pergunta, sensor, eixo_x, eixo_y) VALUES (?, ?, ?, ?, ?)`,
          [formulario, numeroPergunta, sensor, x, y]
        );
      } catch (err) {
        console.error("Erro ao inserir no banco (mobile):", err);
      }
    };

    const handle = (data: SensorData) => insertData(data.x, data.y);

    if (sensor === "accelerometer") {
      Accelerometer.setUpdateInterval(100);
      subscription = Accelerometer.addListener(handle);
    } else if (sensor === "gyroscope") {
      Gyroscope.setUpdateInterval(100);
      subscription = Gyroscope.addListener(handle);
    }

    return () => {
      isCancelled = true;
      subscription?.remove?.();
    };
  }, [formulario, numeroPergunta, sensor]);
}