import { useEffect } from "react";
import { Accelerometer, Gyroscope } from "expo-sensors";
import { db } from "../database/db";

type SensorType = "accelerometer" | "gyroscope";

interface SensorData {
  x: number;
  y: number;
  z: number;
}

export function useSensorLogger(
  formulario: string,
  numeroPergunta: number,
  sensor: SensorType
) {
  useEffect(() => {
    let isCancelled = false;

    const insertData = async (x: number, y: number) => {
      if (isCancelled) return;

      try {
        await db.runAsync(
          `INSERT INTO sensor_data (formulario, numero_pergunta, sensor, eixo_x, eixo_y)
           VALUES (?, ?, ?, ?, ?)`,
          [formulario, numeroPergunta, sensor, x, y]
        );
      } catch (error) {
        console.error("Erro ao inserir dado do sensor:", error);
      }
    };

    const handleSensorData = (data: SensorData) => {
      insertData(data.x, data.y);
    };

    let subscription: any;

    if (sensor === "accelerometer") {
      Accelerometer.setUpdateInterval(100); // 0,10 segundos
      subscription = Accelerometer.addListener(handleSensorData);
    } else if (sensor === "gyroscope") {
      Gyroscope.setUpdateInterval(100);
      subscription = Gyroscope.addListener(handleSensorData);
    }

    return () => {
      isCancelled = true;
      subscription?.remove?.();
    };
  }, [formulario, numeroPergunta, sensor]);
}