import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import CarSide from "react-native-vector-icons/FontAwesome5";
import Grass from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = ({ navigation }) => {
  const carPosition = useRef(new Animated.Value(0)).current;
  const carOpacity = useRef(new Animated.Value(1)).current;

  const [vagas, setVagas] = useState([]); // Armazena o estado das vagas
  const [vagaStatus, setVagaStatus] = useState("Carregando...");

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(carPosition, {
          toValue: 150,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(carOpacity, {
          toValue: 0,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(carPosition, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(carOpacity, {
            toValue: 1,
            duration: 1000,
            delay: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  useEffect(() => {
    startAnimation();

    const fetchVagasStatus = async () => {
      try {
        const response = await fetch("http://192.168.204.42");
        const data = await response.json();
        console.log(response);
        console.log(data);


        // Atualizar o estado das vagas com base nos dados da API
        const vagasAtualizadas = [
          { id: 1, status: data.vaga1 },
          { id: 2, status: data.vaga2 },
          { id: 3, status: data.vaga3 },
        ];
        setVagas(vagasAtualizadas);

        // Atualizar o status geral para exibição
        setVagaStatus(
          `Vaga 1: ${data.vaga1}, Vaga 2: ${data.vaga2}, Vaga 3: ${data.vaga3}`
        );
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    const interval = setInterval(() => {
      fetchVagasStatus();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnHeader}>
          <Text style={styles.textHeader}>
            Total de Vagas: {vagas.length}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Exibição das vagas */}
      <View style={styles.vagasContainer}>
        {vagas.map((vaga, index) => (
          <View key={vaga.id} style={styles.vaga}>
            <View style={styles.vagaIconContainer}>
              <CarSide
                name="car-side"
                size={40}
                color={vaga.status === "Livre" ? "#14AE5C" : "#fb6555"}
              />
              <Grass
                name="grass"
                size={40}
                color={vaga.status === "Livre" ? "#14AE5C" : "#fb6555"}
              />
            </View>
            <Text
              style={[
                styles.vagaText,
                { color: vaga.status === "Livre" ? "#14AE5C" : "#fb6555" },
              ]}
            >
              Vaga {index + 1} - {vaga.status}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Status Geral:</Text>
        <Text style={styles.statusText}>{vagaStatus}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  btnHeader: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  vagasContainer: {
    marginTop: 20,
  },
  vaga: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  vagaIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  vagaText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  statusContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    color: "#333333",
  },
});

export default HomeScreen;
