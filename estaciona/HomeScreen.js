import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import CarSide from "react-native-vector-icons/FontAwesome5";
import Grass from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = ({ navigation }) => {
  const carPosition = useRef(new Animated.Value(0)).current;
  const carOpacity = useRef(new Animated.Value(1)).current;

  // Estados para armazenar os dados das vagas
  const [vagasLivres, setVagasLivres] = useState(0);
  const [vagasOcupadas, setVagasOcupadas] = useState(0);
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
    
        // Ajuste para os dados do ESP32
        const vagasOcupadas = data.vaga1 === "Ocupada" ? 1 : 0;
        const vagasLivres = data.vaga2 === "Livre" ? 1 : 0;
    
        setVagasLivres(vagasLivres);
        setVagasOcupadas(vagasOcupadas);
        setVagaStatus(`Vaga 1: ${data.vaga1}, Vaga 2: ${data.vaga2}`);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    
    // Chamar a API a cada 5 segundos
    const interval = setInterval(() => {
      fetchVagasStatus();
    }, 3000); // 5000ms = 5 segundos

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.park}>
          <TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333333" }}>
              Total de Vagas: 4
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusPark}>
          <TouchableOpacity>
            <Text style={styles.optionTextFree}>Vagas Livres: {vagasLivres}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.optionTextOccu}>Vagas Ocupadas: {vagasOcupadas}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 50 }}>
        {/* Vagas Livres */}
        {[...Array(vagasLivres)].map((_, index) => (
          
          <View key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between",}}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
            <Animated.View
              style={{
                transform: [{ translateX: carPosition }],
                opacity: carOpacity,
              }}
            >
              <CarSide name="car-side" size={40} color={"#14AE5C"} />
            </Animated.View>
            <Grass name="grass" size={40} color={"#14AE5C"} />
            </View>

            <View style={styles.option}>
              <Text style={styles.optionTextFree}>Vaga {index + 1}</Text>
            </View>
        </View>

          
        ))}

        {/* Vagas Ocupadas */}
        {[...Array(vagasOcupadas)].map((_, index) => (
          
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <CarSide name="car-side" size={40} color="#fb6555" />
              <Grass name="grass" size={40} color="#fb6555" />
            </View>
          <View key={index + vagasLivres} style={styles.option}>
            
            <Text style={styles.optionTextOccu}>
              Vaga {vagasLivres + index + 1}
            </Text>
          </View>
          </View>
          
        ))}
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
  optionTextFree: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#14AE5C",
  },
  optionTextOccu: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fb6555",
  },
});

export default HomeScreen;
