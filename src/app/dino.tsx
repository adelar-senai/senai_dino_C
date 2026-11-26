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
        <View style={styles.ground}></View>
        <Animated.View
          style={[
            styles.dino,
            {
              transform: [{ translateY: pulo }],
            },
          ]}
        >
          {" "}
          <Image
            source={require("@/assets/images/dino_car_transparent.png")}
            style={{
              width: 120,
              right: 37,
              height: 58,
              resizeMode: "contain",
            }}
          />
        </Animated.View>
        <View style={styles.cactus} />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  game: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    position: "relative", // referência para os filhos absolutos
    overflow: "hidden", // cacto some ao sair da área
    backgroundColor: "#f7f7f7",
  },
  ground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: GROUND,
    backgroundColor: "#535353",
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
    backgroundColor: "green",
  },
});
