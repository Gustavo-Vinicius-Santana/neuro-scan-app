import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function Sobre() {
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);

  function handlePress() {
    router.replace("/termoParticipacao");
  }

  return (
    <View style={styles.container}>
      {/* Acordeon 1 */}
      <View style={styles.accordion}>
        <TouchableOpacity
          onPress={() => setCollapsed1(!collapsed1)}
          style={styles.header}
        >
          <View style={styles.headerLeft}>
            <Feather name="info" size={22} color="#7189BC" />
            <Text style={styles.headerText}>O que é</Text>
          </View>
          <AntDesign
            name={collapsed1 ? "down" : "up"}
            size={22}
            color="#7189BC"
          />
        </TouchableOpacity>

        <Collapsible collapsed={collapsed1}>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              Esta aplicação tem como objetivo auxiliar os usuários na gestão do bem-estar físico e mental, fornecendo ferramentas e registros personalizados.
            </Text>
          </View>
        </Collapsible>
      </View>

      {/* Acordeon 2 */}
      <View style={styles.accordion}>
        <TouchableOpacity
          onPress={() => setCollapsed2(!collapsed2)}
          style={styles.header}
        >
          <View style={styles.headerLeft}>
            <Feather name="bar-chart-2" size={22} color="#7189BC" />
            <Text style={styles.headerText}>Por que utilizá-lo</Text>
          </View>
          <AntDesign
            name={collapsed2 ? "down" : "up"}
            size={22}
            color="#7189BC"
          />
        </TouchableOpacity>

        <Collapsible collapsed={collapsed2}>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              Utilizar esta aplicação permite um acompanhamento mais eficiente dos hábitos de saúde, ajudando a identificar padrões e promover melhorias no estilo de vida.
            </Text>
          </View>
        </Collapsible>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 16,
  },
  accordion: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: 'rgba(113, 137, 188, 0.15)',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    fontSize: 17,
    fontWeight: '500', // suaviza sem deixar "fino"
    color: '#7189BC',
  },
  content: {
    backgroundColor: 'rgba(113, 137, 188, 0.1)',
    padding: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 4,
  },
  contentText: {
    fontSize: 15,
    color: '#7189BC',
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#0033A0",
    padding: 15,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 30,
    width: "25%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});