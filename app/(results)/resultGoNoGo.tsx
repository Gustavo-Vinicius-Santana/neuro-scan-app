import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useGoNoGoStore } from "@/lib/stores/useGoNoGo";

export default function Resultado() {
  const { lastMetrics } = useGoNoGoStore();

  if (!lastMetrics) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noDataText}>Nenhum resultado disponível.</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/test")}
        >
          <Text style={styles.backButtonText}>Voltar para o teste</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.header}>Resultado do Teste</Text>

      <View style={styles.card}>
        <ResultItem label="Erros de Comissão (%)" value={lastMetrics.commissionErrorsPct} />
        <ResultItem label="Erros de Omissão (%)" value={lastMetrics.omissionErrorsPct} />
        <ResultItem label="Acerto em GO (%)" value={lastMetrics.goAccuracyPct} />
        <ResultItem label="Tempo Médio de Reação (ms)" value={lastMetrics.meanRT} />
        <ResultItem label="Variabilidade do RT (ms)" value={lastMetrics.rtStdDev} />
        <ResultItem label="Latência Média em No-Go (erro)" value={lastMetrics.meanNoGoLatency} />
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.backButtonText}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}

function ResultItem({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 60, alignItems: "center" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F5F5" },
  header: { fontSize: 28, fontWeight: "700", color: "#222", marginBottom: 25 },
  card: {
    width: "88%",
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 30,
  },
  resultRow: { marginBottom: 12 },
  label: { color: "#555", fontSize: 16, marginBottom: 4 },
  value: { color: "#222", fontSize: 20, fontWeight: "700" },
  noDataText: { fontSize: 18, color: "#444", marginBottom: 20 },
  backButton: { backgroundColor: "#0077FF", paddingVertical: 14, paddingHorizontal: 30, borderRadius: 12, marginTop: 20 },
  backButtonText: { color: "#FFF", fontSize: 18, fontWeight: "700" },
});
