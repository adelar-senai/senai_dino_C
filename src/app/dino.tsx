import { ThemedView } from "@/components/themed-view";
import { useRef } from "react";
import { StyleSheet, View, Animated, Image, Pressable } from "react-native";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 300;
const GROUND = 40; // altura do chão

export default function DinoScreen() {
  const pulo = useRef(new Animated.Value(0)).current;
  const estaPulando = useRef(false);

  const iniciarPulo = () => {
    if (estaPulando.current) return;
    estaPulando.current = true;

    Animated.sequence([
      Animated.timing(pulo, {
        toValue: -110,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(pulo, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      estaPulando.current = false;
    });
  };
  return (
    <ThemedView style={styles.container}>
      <Pressable onPressIn={iniciarPulo} style={styles.game}>

          <Image
            source={require("@/assets/images/cenario do jogo.png")}
            style={{
              width: 850,
              right: 40,
              height: 320,
            }}
          />

        <Animated.View
          style={[
            styles.dino,
            {
              transform: [{ translateY: pulo }],
            },
          ]}
        >
          <Image
            source={require("@/assets/images/lin-correndo.png")}
            style={{
              width: 115,
              right: 37,
              height: 56,
              resizeMode: "contain",
            }}
          />
        </Animated.View>

        <View style={styles.cactus}>
          <Image
            source={require("@/assets/images/galinha-barreira.png")}
            style={{
              width: 115,
              right: 37,
              bottom: 10,
              height: 54,
              resizeMode: "contain",
            }}
          />
        </View>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#302e2e",
  },
  game: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    position: "relative", // referência para os filhos absolutos
    overflow: "hidden", // cacto some ao sair da área
    backgroundColor: "#f7f7f7",
    borderWidth: 4,
    borderColor: "#09d6fa",
    borderRadius: 8,

  },

  dino: {
    position: "absolute",
    bottom: GROUND, // em cima do chão
    left: 40,
    width: 44,
    height: 48,
    backgroundColor: "transparent",
  },
  cactus: {
    position: "absolute",
    bottom: GROUND,
    left: GAME_WIDTH - 20, // começa na borda direita
    width: 20,
    height: 40,
    backgroundColor: "transparent",
  },
});
