import { useEffect, useState, useRef, useCallback } from "react";

interface SensorSample {
  timestamp: string;
  eixo_x: number;
  eixo_y: number;
  eixo_z: number;
}

export function useAccelerometerWeb(resetKey?: any) {
  const [samples, setSamples] = useState<SensorSample[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef<boolean>(true); // controla start/pause
  const accelRef = useRef({ x: 0, y: 0, z: 0 });

  const start = useCallback(() => {
    activeRef.current = true;
  }, []);

  const pause = useCallback(() => {
    activeRef.current = false;
  }, []);

  useEffect(() => {
    function handleMotion(event: DeviceMotionEvent) {
      if (event.accelerationIncludingGravity) {
        accelRef.current = {
          x: event.accelerationIncludingGravity.x ?? 0,
          y: event.accelerationIncludingGravity.y ?? 0,
          z: event.accelerationIncludingGravity.z ?? 0,
        };
      }
    }

    window.addEventListener("devicemotion", handleMotion);

    intervalRef.current = setInterval(() => {
      if (!activeRef.current) return;

      const accel = accelRef.current;
      setSamples(prev => [
        ...prev,
        {
          timestamp: new Date().toISOString(),
          eixo_x: accel.x,
          eixo_y: accel.y,
          eixo_z: accel.z,
        },
      ]);
    }, 100);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetKey]);

  // Reseta samples sempre que resetKey muda
  useEffect(() => {
    setSamples([]);
  }, [resetKey]);

  return { samples, start, pause };
}

export function useGyroscopeWeb(resetKey?: any) {
  const [samples, setSamples] = useState<SensorSample[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef<boolean>(true);
  const gyroRef = useRef({ x: 0, y: 0, z: 0 });

  const start = useCallback(() => {
    activeRef.current = true;
  }, []);

  const pause = useCallback(() => {
    activeRef.current = false;
  }, []);

  useEffect(() => {
    function handleMotion(event: DeviceMotionEvent) {
      if (event.rotationRate) {
        gyroRef.current = {
          x: event.rotationRate.beta ?? 0,
          y: event.rotationRate.gamma ?? 0,
          z: event.rotationRate.alpha ?? 0,
        };
      }
    }

    window.addEventListener("devicemotion", handleMotion);

    intervalRef.current = setInterval(() => {
      if (!activeRef.current) return;

      const gyro = gyroRef.current;
      setSamples(prev => [
        ...prev,
        {
          timestamp: new Date().toISOString(),
          eixo_x: gyro.x,
          eixo_y: gyro.y,
          eixo_z: gyro.z,
        },
      ]);
    }, 100);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetKey]);

  useEffect(() => {
    setSamples([]);
  }, [resetKey]);

  return { samples, start, pause };
}