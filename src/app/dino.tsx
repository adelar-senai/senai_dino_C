import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/themed-view";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 300;
const GROUND = 40; // altura do chão

export default function DinoScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.game}>
        <View style={styles.ground} />
        <View style={styles.dino} />
        <View style={styles.cactus} />
      </View>
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
    backgroundColor: "#535353",
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
