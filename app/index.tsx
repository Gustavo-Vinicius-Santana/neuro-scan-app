import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { initializeDatabase } from "@/lib/database/initializeDatabase";

const { width, height } = Dimensions.get("window");

export default function Index() {
    const router = useRouter();

    const handleStart = () => {
        router.replace("/sobre");
    };

    useEffect(() => {
        initializeDatabase();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>neuroscan</Text>
            
            <View style={styles.welcomeContainer}>
                <Text style={styles.title}>Seja{"\n"}bem vindo!</Text>
            </View>

            <View style={styles.bottomCurve}>
                <View style={styles.curveBackground}>
                    <TouchableOpacity style={styles.button} onPress={handleStart}>
                        <Text style={styles.buttonText}>Vamos lá!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0033A0",
    },
    logo: {
        position: 'absolute',
        top: height * 0.12,
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textTransform: "uppercase",
    },
    welcomeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: height * 0.25,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        lineHeight: 40,
    },
    bottomCurve: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: height * 0.35,
        overflow: 'hidden',
    },
    curveBackground: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: width * 0.25,
        borderTopRightRadius: width * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    button: {
        backgroundColor: "#0033A0",
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});