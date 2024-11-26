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
        <View style={styles.park}>
          <TouchableOpacity style={styles.btnPark}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333333", fontFamily: 'Roboto_400Regular', }}>
              Total de Vagas: {vagas.length}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusPark}>
          <TouchableOpacity style={styles.freePark}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#14AE5C", fontFamily: 'Roboto_400Regular', }}>
              Vagas Livres:{" "}
              {vagas.filter((vaga) => vaga.status === "Livre").length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.occupiedPark}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fb6555", fontFamily: 'Roboto_400Regular', }}>
              Vagas Ocupadas:{" "}
              {vagas.filter((vaga) => vaga.status === "Ocupada").length}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Exibição das Vagas com Condição */}
      <View style={{ marginTop: 25 }}>
        {vagas.map((vaga, index) => (
          <View
            key={vaga.id}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {vaga.status === "Livre" ? (
                <Animated.View
                  style={{
                    transform: [{ translateX: carPosition }],
                    opacity: carOpacity,
                  }}
                >
                  <CarSide name="car-side" size={40} color={"#14AE5C"} />
                </Animated.View>
              ) : (
                <CarSide name="car-side" size={40} color={"#fb6555"} />
              )}
              <Grass
                name="grass"
                size={40}
                color={vaga.status === "Livre" ? "#14AE5C" : "#fb6555"}
              />
            </View>

            <View style={styles.option}>
              <Text
                style={
                  vaga.status === "Livre"
                    ? styles.optionTextFree
                    : styles.optionTextOccu
                }
              >
                Vaga {index + 1}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Status Geral:</Text>
        <Text style={styles.statusText}>{vagaStatus}</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("DisplayScreen")}>
        <Text>Ir para Display</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  statusTitle: {
    fontFamily: 'Roboto_400Regular',
  },


  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  park: {
    width: "40%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  statusPark: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  option: {
    marginBottom: 5,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: "100%",
  },
  optionTextFree: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#14AE5C",
    fontFamily: 'Roboto_400Regular',
  },
  optionTextOccu: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fb6555",
    fontFamily: 'Roboto_400Regular',
  },

  statusContainer: {
    display: "none", // Status está oculto, pode ser mostrado quando necessário
  },
});

export default HomeScreen;
