import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Accelerometer, Gyroscope } from "expo-sensors";

export default function TesteSensor() {
    const router = useRouter();

    const [accData, setAccData] = useState({ x: 0, y: 0, z: 0 });
    const [gyroData, setGyroData] = useState({ alpha: 0, beta: 0, gamma: 0 });

    const [mobileAcc, setMobileAcc] = useState({ x: 0, y: 0, z: 0 });
    const [mobileGyro, setMobileGyro] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        if (Platform.OS === "web" && typeof window !== "undefined") {
            const handleMotion = (event: DeviceMotionEvent) => {
                if (event.accelerationIncludingGravity) {
                    setAccData({
                        x: event.accelerationIncludingGravity.x || 0,
                        y: event.accelerationIncludingGravity.y || 0,
                        z: event.accelerationIncludingGravity.z || 0,
                    });
                }
            };

            const handleOrientation = (event: DeviceOrientationEvent) => {
                setGyroData({
                    alpha: event.alpha || 0,
                    beta: event.beta || 0,
                    gamma: event.gamma || 0,
                });
            };

            window.addEventListener("devicemotion", handleMotion);
            window.addEventListener("deviceorientation", handleOrientation);

            return () => {
                window.removeEventListener("devicemotion", handleMotion);
                window.removeEventListener("deviceorientation", handleOrientation);
            };
        } else {
            const accSub = Accelerometer.addListener(data => setMobileAcc(data));
            const gyroSub = Gyroscope.addListener(data => setMobileGyro(data));

            Accelerometer.setUpdateInterval(500);
            Gyroscope.setUpdateInterval(500);

            return () => {
                accSub.remove();
                gyroSub.remove();
            };
        }
    }, []);

    function handlePress() {
        router.replace("/termoParticipacao");
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Teste Sensores</Text>

            {Platform.OS === "web" ? (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Sensores em tempo real (Web)</Text>
                    <Text style={styles.paragraph}>
                        <Text style={{ fontWeight: "bold" }}>Acelerômetro:</Text> {"\n"}
                        X: {accData.x.toFixed(2)} | Y: {accData.y.toFixed(2)} | Z: {accData.z.toFixed(2)}
                    </Text>
                    <Text style={styles.paragraph}>
                        <Text style={{ fontWeight: "bold" }}>Orientação:</Text> {"\n"}
                        Alpha: {gyroData.alpha.toFixed(2)}° | Beta: {gyroData.beta.toFixed(2)}° | Gamma: {gyroData.gamma.toFixed(2)}°
                    </Text>
                </View>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Sensores em tempo real (Mobile)</Text>
                    <Text style={styles.paragraph}>
                        <Text style={{ fontWeight: "bold" }}>Acelerômetro:</Text> {"\n"}
                        X: {mobileAcc.x.toFixed(2)} | Y: {mobileAcc.y.toFixed(2)} | Z: {mobileAcc.z.toFixed(2)}
                    </Text>
                    <Text style={styles.paragraph}>
                        <Text style={{ fontWeight: "bold" }}>Giroscópio:</Text> {"\n"}
                        X: {mobileGyro.x.toFixed(2)} | Y: {mobileGyro.y.toFixed(2)} | Z: {mobileGyro.z.toFixed(2)}
                    </Text>
                </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Vamos lá</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f4f4f4",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: 30,
        textAlign: "center",
    },
    card: {
        backgroundColor: "rgba(0, 123, 255, 0.15)",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#007BFF",
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        color: "#333",
        lineHeight: 22,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});