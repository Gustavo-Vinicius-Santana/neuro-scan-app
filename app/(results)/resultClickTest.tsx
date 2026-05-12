import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useClickTestStore } from "@/lib/stores/useClickTest";
import { Ionicons } from "@expo/vector-icons";

const Colors = {
  primary: "#3B82F6",
  primaryDark: "#1E40AF",
  accent: "#F97316",
  success: "#22C55E",
  error: "#EF4444",
  background: "#F5F7FA",
  white: "#FFFFFF",
  text: "#111827",
  textMuted: "#6B7280",
  card: "#F9FAFB",
  border: "#E5E7EB",
};

const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
};

export default function Resultado() {
  const { lastMetrics } = useClickTestStore();

  if (!lastMetrics) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.noDataText}>Nenhum resultado disponível.</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(click-test)/test")}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.primary} />
          <Text style={styles.backButtonText}>Voltar para o teste</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Calcular métricas adicionais
  const intervals: number[] = [];
  for (let i = 1; i < lastMetrics.clickTimestamps.length; i++) {
    intervals.push(lastMetrics.clickTimestamps[i] - lastMetrics.clickTimestamps[i-1]);
  }
  
  const avgInterval = intervals.length > 0 
    ? intervals.reduce((a, b) => a + b, 0) / intervals.length 
    : 0;
  const minInterval = intervals.length > 0 ? Math.min(...intervals) : 0;
  const maxInterval = intervals.length > 0 ? Math.max(...intervals) : 0;
  
  // Calcular alternâncias
  let alternations = 0;
  const targetSequence = lastMetrics.clickTimestamps.map((_, i) => 
    i < lastMetrics.targetA_Hits ? "A" : "B"
  );
  for (let i = 1; i < targetSequence.length; i++) {
    if (targetSequence[i] !== targetSequence[i - 1]) alternations++;
  }
  const alternationRate = lastMetrics.totalClicks > 1 
    ? ((alternations / (lastMetrics.totalClicks - 1)) * 100) 
    : 0;

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.reportCard}>
        {/* Header */}
        <View style={styles.reportHeader}>
          <TouchableOpacity
            style={styles.reportBackButton}
            onPress={() => router.push("/(click-test)/test")}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.primary} />
            <Text style={styles.reportBackText}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.reportTitle}>📋 Relatório do Experimento</Text>
        </View>

        {/* Resumo Geral */}
        <View style={styles.reportSummaryBox}>
          <Text style={styles.reportSummaryTitle}>Resumo Geral</Text>
          <View style={styles.reportSummaryGrid}>
            <View style={styles.reportSummaryItem}>
              <Text style={styles.reportSummaryValue}>{lastMetrics.totalClicks}</Text>
              <Text style={styles.reportSummaryLabel}>Total de toques</Text>
            </View>
            <View style={styles.reportSummaryItem}>
              <Text style={[styles.reportSummaryValue, { color: Colors.primary }]}>
                {lastMetrics.targetA_Hits}
              </Text>
              <Text style={styles.reportSummaryLabel}>Alvo A</Text>
            </View>
            <View style={styles.reportSummaryItem}>
              <Text style={[styles.reportSummaryValue, { color: Colors.accent }]}>
                {lastMetrics.targetB_Hits}
              </Text>
              <Text style={styles.reportSummaryLabel}>Alvo B</Text>
            </View>
            <View style={styles.reportSummaryItem}>
              <Text style={styles.reportSummaryValue}>{lastMetrics.clicksPerSecond.toFixed(1)}</Text>
              <Text style={styles.reportSummaryLabel}>Toques/s</Text>
            </View>
            <View style={styles.reportSummaryItem}>
              <Text style={styles.reportSummaryValue}>{(avgInterval).toFixed(0)}ms</Text>
              <Text style={styles.reportSummaryLabel}>Intervalo médio</Text>
            </View>
            <View style={styles.reportSummaryItem}>
              <Text style={styles.reportSummaryValue}>{minInterval}ms</Text>
              <Text style={styles.reportSummaryLabel}>Intervalo mín.</Text>
            </View>
            <View style={styles.reportSummaryItem}>
              <Text style={styles.reportSummaryValue}>{maxInterval}ms</Text>
              <Text style={styles.reportSummaryLabel}>Intervalo máx.</Text>
            </View>
            <View style={styles.reportSummaryItem}>
              <Text style={styles.reportSummaryValue}>{lastMetrics.averageTouchDuration.toFixed(0)}ms</Text>
              <Text style={styles.reportSummaryLabel}>Duração toque</Text>
            </View>
            <View style={styles.reportSummaryItem}>
              <Text style={styles.reportSummaryValue}>{alternationRate.toFixed(1)}%</Text>
              <Text style={styles.reportSummaryLabel}>Alternância</Text>
            </View>
          </View>
        </View>

        {/* Frequência ao Longo do Tempo */}
        <View style={styles.reportSectionBox}>
          <Text style={styles.reportSectionTitle}>Frequência ao Longo do Tempo</Text>
          <View style={styles.frequencyGrid}>
            {lastMetrics.frequencyOverTime.map((item, index) => (
              <View key={index} style={styles.frequencyItem}>
                <Text style={styles.frequencyTime}>{item.time}-{item.time + 5}s</Text>
                <Text style={styles.frequencyValue}>{item.frequency.toFixed(1)}</Text>
                <Text style={styles.frequencyLabel}>toques/s</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tabela Detalhada */}
        <Text style={styles.reportTableTitle}>Registro de cada toque</Text>
        <View style={styles.reportTable}>
          {/* Header */}
          <View style={[styles.reportTableRow, styles.reportTableHeaderRow]}>
            <Text style={[styles.reportTableCell, styles.reportTableHeaderCell, { flex: 0.5 }]}>
              #
            </Text>
            <Text style={[styles.reportTableCell, styles.reportTableHeaderCell, { flex: 0.8 }]}>
              Alvo
            </Text>
            <Text style={[styles.reportTableCell, styles.reportTableHeaderCell, { flex: 1.2 }]}>
              Timestamp (ms)
            </Text>
            <Text style={[styles.reportTableCell, styles.reportTableHeaderCell, { flex: 1 }]}>
              Duração (ms)
            </Text>
            <Text style={[styles.reportTableCell, styles.reportTableHeaderCell, { flex: 1 }]}>
              Intervalo
            </Text>
          </View>
          
          {/* Rows */}
          <ScrollView style={{ maxHeight: 400 }}>
            {lastMetrics.touchDurations.map((duration, i) => {
              const interval = i > 0 ? intervals[i-1] : 0;
              const isTargetA = i < lastMetrics.targetA_Hits;
              return (
                <View
                  key={i}
                  style={[
                    styles.reportTableRow,
                    i % 2 === 0 ? styles.reportTableRowEven : styles.reportTableRowOdd,
                  ]}
                >
                  <Text style={[styles.reportTableCell, { flex: 0.5 }]}>
                    {i + 1}
                  </Text>
                  <Text
                    style={[
                      styles.reportTableCell,
                      {
                        flex: 0.8,
                        color: isTargetA ? Colors.primary : Colors.accent,
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {isTargetA ? "A" : "B"}
                  </Text>
                  <Text style={[styles.reportTableCell, { flex: 1.2 }]}>
                    {lastMetrics.clickTimestamps[i]}
                  </Text>
                  <Text style={[styles.reportTableCell, { flex: 1 }]}>
                    {duration.toFixed(0)}
                  </Text>
                  <Text style={[styles.reportTableCell, { flex: 1 }]}>
                    {i === 0 ? "-" : `${interval}ms`}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {lastMetrics.totalClicks === 0 && (
          <Text style={styles.reportEmpty}>Nenhum toque registrado.</Text>
        )}

        {/* Botões de Ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => router.push("/(click-test)/test")}
          >
            <Ionicons name="refresh" size={20} color={Colors.primary} />
            <Text style={styles.retryButtonText}>Repetir Teste</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.homeButton} 
            onPress={() => router.push("/")}
          >
            <Text style={styles.homeButtonText}>Página Inicial</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },

  reportCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    margin: Spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  
  reportHeader: {
    marginBottom: Spacing.md,
  },
  
  reportBackButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: Spacing.sm,
  },
  
  reportBackText: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: "600",
  },
  
  reportTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.primaryDark,
  },
  
  reportSummaryBox: {
    backgroundColor: "#F0F5FF",
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  
  reportSummaryTitle: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: Colors.primaryDark,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  
  reportSummaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  
  reportSummaryItem: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: "center",
    minWidth: 100,
    flex: 1,
  },
  
  reportSummaryValue: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    color: Colors.primaryDark,
  },
  
  reportSummaryLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: 2,
  },
  
  reportSectionBox: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  
  reportSectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  
  frequencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  
  frequencyItem: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: "center",
    minWidth: 80,
  },
  
  frequencyTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textAlign: "center",
  },
  
  frequencyValue: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
    color: Colors.primary,
  },
  
  frequencyLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textAlign: "center",
  },
  
  reportTableTitle: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  
  reportTable: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    marginBottom: Spacing.lg,
  },
  
  reportTableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  
  reportTableHeaderRow: {
    backgroundColor: Colors.primaryDark,
  },
  
  reportTableRowEven: {
    backgroundColor: "#F9FAFB",
  },
  
  reportTableRowOdd: {
    backgroundColor: Colors.white,
  },
  
  reportTableCell: {
    fontSize: FontSizes.sm,
    color: Colors.text,
  },
  
  reportTableHeaderCell: {
    color: Colors.white,
    fontWeight: "bold",
  },
  
  reportEmpty: {
    fontSize: FontSizes.md,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.lg,
  },
  
  actionButtons: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  
  retryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: BorderRadius.pill,
    borderWidth: 2,
    borderColor: Colors.primary,
    gap: Spacing.xs,
  },
  
  retryButtonText: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: Colors.primary,
  },
  
  homeButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: BorderRadius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  
  homeButtonText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: "bold",
  },
  
  noDataText: {
    fontSize: FontSizes.md,
    color: Colors.textMuted,
    marginBottom: Spacing.lg,
  },
  
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: BorderRadius.pill,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  
  backButtonText: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
