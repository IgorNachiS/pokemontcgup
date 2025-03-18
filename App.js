import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import * as Font from 'expo-font';  // Usando expo-font para carregar as fontes
import AppLoading from 'expo-app-loading';  // Usando AppLoading da Expo para gerenciar o carregamento das fontes

// Dados das cartas de Pokémon
const cartasPokemon = [
  {
    id: "1",
    nome: "Charizard ex",
    tipo: "Fogo",
    raridade: "Chase",
    hp: "280",
    ataque: "Explosão Ígnea",
    image: require("./assets/images/charizard_ex.png"),
    isChase: true,
  },
  {
    id: "5",
    nome: "Raikou ex",
    tipo: "Elétrico",
    raridade: "Chase",
    hp: "220",
    ataque: "Relâmpago Selvagem",
    image: require("./assets/images/raikou_ex.png"),
    isChase: true,
  },
  {
    id: "2",
    nome: "Pikachu",
    tipo: "Elétrico",
    raridade: "Comum",
    hp: "60",
    ataque: "Choque do Trovão",
    image: require("./assets/images/pikachu.png"),
    isChase: false,
  },
  {
    id: "3",
    nome: "Blastoise",
    tipo: "Água",
    raridade: "Rara",
    hp: "120",
    ataque: "Jato D'água",
    image: require("./assets/images/blastoise.png"),
    isChase: false,
  },
  {
    id: "4",
    nome: "Gardevoir",
    tipo: "Psíquico",
    raridade: "Incomum",
    hp: "90",
    ataque: "Explosão Psíquica",
    image: require("./assets/images/gardevoir.png"),
    isChase: false,
  },
];

// Componente para renderizar cada carta de Pokémon
const CartaPokemonItem = ({ carta, onPress, expanded }) => (
  <TouchableOpacity onPress={() => onPress(carta.id)} style={[styles.card, carta.isChase && styles.chaseCard]}>
    <Text style={styles.title}>{carta.nome}</Text>
    <Image source={carta.image} style={styles.image} />
    {expanded && (
      <View style={styles.info}>
        <Text style={styles.details}>Tipo: {carta.tipo}</Text>
        <Text style={styles.details}>Raridade: {carta.raridade}</Text>
        <Text style={styles.details}>HP: {carta.hp}</Text>
        <Text style={styles.details}>Ataque: {carta.ataque}</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);  // Controla a carta expandida

  // Carregar fontes de forma assíncrona
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'PressStart2P_400Regular': require('@expo-google-fonts/press-start-2p/PressStart2P_400Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  // Se as fontes não foram carregadas, mostrar o AppLoading
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Função para alternar entre expandir e recolher a carta
  const toggleExpand = (cardId) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);  // Se já está expandido, recolhe, caso contrário expande
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Surging Sparks Chase Cards</Text>

      {/* Renderização das cartas */}
      <FlatList
        data={cartasPokemon}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartaPokemonItem
            carta={item}
            onPress={toggleExpand}
            expanded={expandedCardId === item.id}  // Se o id da carta for o mesmo que o id expandido, mostra as informações
          />
        )}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: 'PressStart2P_400Regular', // Fonte Press Start 2P
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    marginHorizontal: 10,
  },
  chaseCard: {
    borderColor: "gold",
    borderWidth: 3,
    shadowColor: "gold",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 63 / 88,
    borderRadius: 10,
  },
  info: {
    padding: 10,
    width: "100%",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    fontFamily: 'PressStart2P_400Regular', // Fonte Press Start 2P
  },
  details: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    fontFamily: 'PressStart2P_400Regular', // Fonte Press Start 2P
  },
  flatList: {
    alignItems: "center", // Alinha o conteúdo da FlatList no centro
  },
});
