import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { useRouter } from "expo-router";
import { initializeDatabase } from "@/lib/database/initializeDatabase";

//@ts-ignore
import logo from '@/assets/images/appImages/logo.png';

export default function Index() {
  const router = useRouter();

  const handleStart = () => {
    router.replace("/testeSensor");
  };

  useEffect(() => {
    (async () => {
      try {
        await initializeDatabase();
      } catch (error) {
        console.warn("Erro ao inicializar o banco de dados:", error);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image source={logo} />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Seja{"\n"}bem vindo!</Text>
      </View>

      <View style={styles.bottomCurve}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Vamos lá!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0033A0",
    justifyContent: "space-between",
  },
  logo: {
    marginTop: 40,
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    lineHeight: 40,
  },
  bottomCurve: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingVertical: 40,
    alignItems: "center",
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