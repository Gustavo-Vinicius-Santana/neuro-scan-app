import { useEffect } from "react";
import { initDatabase } from "../database/db";
import { Platform } from "react-native";

export function useSensorLoggerWeb(formulario: string, numeroPergunta: number) {
  useEffect(() => {
    if (Platform.OS !== "web") return;

    let isCancelled = false;

    const insertData = async (x: number, y: number, z: number) => {
      if (isCancelled) return;
      try {
        const db = await initDatabase();
        db.run(
          `INSERT INTO sensor_data (formulario, numero_pergunta, sensor, eixo_x, eixo_y, eixo_z) VALUES (?, ?, ?, ?, ?, ?)`,
          [formulario, numeroPergunta, "accelerometer", x, y, z]
        );
      } catch (err) {
        console.error("Erro ao inserir no banco (web):", err);
      }
    };

    const handle = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const x = acc.x ?? 0;
      const y = acc.y ?? 0;
      const z = acc.z ?? 0;
      insertData(x, y, z);
    };

    window.addEventListener("devicemotion", handle);
    return () => {
      isCancelled = true;
      window.removeEventListener("devicemotion", handle);
    };
  }, [formulario, numeroPergunta]);
}