import { useEffect } from "react";
import { initDatabase } from "../database/db";

interface SensorData {
  x: number;
  y: number;
}

export function useSensorLoggerWeb(formulario: string, numeroPergunta: number) {
  useEffect(() => {
    let isCancelled = false;

    const insertData = async (x: number, y: number) => {
      if (isCancelled) return;
      try {
        const db = await initDatabase();
        db.run(
          `INSERT INTO sensor_data (formulario, numero_pergunta, sensor, eixo_x, eixo_y) VALUES (?, ?, ?, ?, ?)`,
          [formulario, numeroPergunta, "accelerometer", x, y]
        );
      } catch (err) {
        console.error("Erro ao inserir no banco (web):", err);
      }
    };

    const handle = (e: DeviceMotionEvent) => {
      if (!e.acceleration) return;
      const x = e.acceleration.x ?? 0;
      const y = e.acceleration.y ?? 0;
      insertData(x, y);
    };

    window.addEventListener("devicemotion", handle);
    return () => {
      isCancelled = true;
      window.removeEventListener("devicemotion", handle);
    };
  }, [formulario, numeroPergunta]);
}