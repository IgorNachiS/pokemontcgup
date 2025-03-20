import React, { useState, useEffect } from "react";
import {
  View, Text, Image, FlatList, TouchableOpacity, StyleSheet, useColorScheme
} from "react-native";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const cartasPokemon = [
  { id: "1", nome: "Charizard ex", tipo: "Fogo", raridade: "Chase", hp: "280", ataque: "Explosão Ígnea", image: require("./assets/images/charizard_ex.png"), isChase: true },
  { id: "5", nome: "Raikou ex", tipo: "Elétrico", raridade: "Chase", hp: "220", ataque: "Relâmpago Selvagem", image: require("./assets/images/raikou_ex.png"), isChase: true },
  { id: "2", nome: "Pikachu", tipo: "Elétrico", raridade: "Comum", hp: "60", ataque: "Choque do Trovão", image: require("./assets/images/pikachu.png"), isChase: false },
  { id: "3", nome: "Blastoise", tipo: "Água", raridade: "Rara", hp: "120", ataque: "Jato D'água", image: require("./assets/images/blastoise.png"), isChase: false },
  { id: "4", nome: "Gardevoir", tipo: "Psíquico", raridade: "Incomum", hp: "90", ataque: "Explosão Psíquica", image: require("./assets/images/gardevoir.png"), isChase: false },
];

const Stack = createStackNavigator();

const CartaPokemonItem = ({ carta, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(carta)} style={[styles.card, carta.isChase && styles.chaseCard]}>
      <Text style={styles.title}>{carta.nome}</Text>
      <Image source={carta.image} style={styles.image} />
    </TouchableOpacity>
  );
};

function DetalhesCarta({ route }) {
  const { carta } = route.params;

  return (
    <View style={styles.containerDetalhes}>
      <Text style={styles.headerDetalhes}>{carta.nome}</Text>
      <Image source={carta.image} style={styles.imageDetalhes} />
      <Text style={styles.textDetalhes}>Tipo: {carta.tipo}</Text>
      <Text style={styles.textDetalhes}>Raridade: {carta.raridade}</Text>
      <Text style={styles.textDetalhes}>HP: {carta.hp}</Text>
      <Text style={styles.textDetalhes}>Ataque: {carta.ataque}</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const theme = useColorScheme();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'PressStart2P_400Regular': require('@expo-google-fonts/press-start-2p/PressStart2P_400Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) return <AppLoading />;

  const navegarDetalhes = (carta) => {
    navigation.navigate('Detalhes', { carta: carta });
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkMode]}>
      <Text style={styles.header}>Surging Sparks Chase Cards</Text>
      <FlatList
        data={cartasPokemon}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartaPokemonItem carta={item} onPress={navegarDetalhes} />
        )}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detalhes" component={DetalhesCarta} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  darkMode: { backgroundColor: "#333" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center", fontFamily: 'PressStart2P_400Regular' },
  card: {
    backgroundColor: "#fff", borderRadius: 10, borderWidth: 1, borderColor: "#ddd",
    overflow: "hidden", marginBottom: 10, elevation: 3,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2,
    alignItems: "center", padding: 10, marginHorizontal: 10,
  },
  chaseCard: {
    borderColor: "gold", borderWidth: 2,
    shadowColor: "gold", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 5,
    backgroundColor: '#fffaf0'
  },
  image: { width: "100%", aspectRatio: 63 / 88, borderRadius: 5 },
  flatList: { alignItems: "center" },
  containerDetalhes: { flex: 1, alignItems: 'center', padding: 20 },
  imageDetalhes: { width: 250, height: 350, marginBottom: 20 },
  headerDetalhes: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, fontFamily: 'PressStart2P_400Regular' },
  textDetalhes: { fontSize: 16, marginBottom: 5, fontFamily: 'PressStart2P_400Regular' },
})