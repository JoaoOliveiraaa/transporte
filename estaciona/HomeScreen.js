import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import CarSide from "react-native-vector-icons/FontAwesome5";
import Grass from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = ({ navigation }) => {
  const carPosition = useRef(new Animated.Value(0)).current;
  const carOpacity = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(carPosition, {
          toValue: 150,
          duration: 2000,
          useNativeDriver: true,
        }),
        // Desaparecer
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
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.park}>
          <TouchableOpacity style={styles.btnPark}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333333" }}>
              Vagas: 4
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusPark}>
          <TouchableOpacity style={styles.freePark}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#14AE5C" }}>
              Livre: 3
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.occupiedPark}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fb6555" }}>
              Ocupada: 1
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 100 }}>
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
          <Text style={styles.optionTextFree}>Vaga 1</Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
            <CarSide name="car-side" size={40} color={"#fb6555"} />
          <Grass name="grass" size={40} color={"#fb6555"} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionTextOccu}>Vaga 2</Text>
        </View>

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
          <Text style={styles.optionTextFree}>Vaga 3</Text>
        </View>

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
          <Text style={styles.optionTextFree}>Vaga 4</Text>
        </View>
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
  option: {
    marginBottom: 20,
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
