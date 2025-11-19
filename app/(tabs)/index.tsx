import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { Alert, Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
const GAME_DURATION = 30; // seconds

export default function HomeScreen() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameActive, setGameActive] = useState(false);
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // Load high score from storage (simplified - in real app use AsyncStorage)
    const saved = 0; // Could load from AsyncStorage here
    setHighScore(saved);
  }, []);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameActive && timeLeft === 0) {
      endGame();
    }
  }, [gameActive, timeLeft]);

  const generateRound = () => {
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
    const options = shuffled.slice(0, 4);
    const target = options[Math.floor(Math.random() * 4)];
    const correctIdx = options.indexOf(target);

    setTargetColor(target);
    setColorOptions(options);
    setCorrectIndex(correctIdx);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameActive(true);
    generateRound();
  };

  const endGame = () => {
    setGameActive(false);
    if (score > highScore) {
      setHighScore(score);
      // Could save to AsyncStorage here
    }
    Alert.alert(
      'Game Over!',
      `Your score: ${score}\n${score > highScore ? 'New High Score! 🎉' : `High Score: ${highScore}`}`,
      [{ text: 'Play Again', onPress: startGame }]
    );
  };

  const handleColorPress = (index: number) => {
    if (!gameActive) return;

    if (index === correctIndex) {
      // Correct answer
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore(score + 1);
      
      // Animate button press
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Generate new round
      setTimeout(() => {
        generateRound();
      }, 300);
    } else {
      // Wrong answer
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      // Flash red or show error
      Alert.alert('Wrong!', 'Try again!', [{ text: 'OK' }]);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Color Match</ThemedText>
        <ThemedText type="subtitle" style={styles.score}>Score: {score}</ThemedText>
        <ThemedText style={styles.highScore}>High Score: {highScore}</ThemedText>
        {gameActive && (
          <ThemedText style={styles.timer}>Time: {timeLeft}s</ThemedText>
        )}
      </ThemedView>

      {!gameActive ? (
        <ThemedView style={styles.startContainer}>
          <ThemedText type="subtitle" style={styles.instructions}>
            Match the target color!
          </ThemedText>
          <ThemedText style={styles.instructionsText}>
            Tap the color button that matches the target color shown above.
            Score points by matching colors correctly. The game lasts {GAME_DURATION} seconds!
          </ThemedText>
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <ThemedText style={styles.startButtonText}>Start Game</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView style={styles.gameContainer}>
          <ThemedView style={styles.targetContainer}>
            <ThemedText type="subtitle" style={styles.targetLabel}>
              Match this color:
            </ThemedText>
            <View style={[styles.targetColorBox, { backgroundColor: targetColor }]} />
          </ThemedView>

          <View style={styles.optionsContainer}>
            {colorOptions.map((color, index) => (
              <Animated.View
                key={`${color}-${index}`}
                style={[
                  styles.colorButtonContainer,
                  { transform: [{ scale: index === correctIndex ? scaleAnim : 1 }] },
                ]}>
                <TouchableOpacity
                  style={[styles.colorButton, { backgroundColor: color }]}
                  onPress={() => handleColorPress(index)}
                  activeOpacity={0.8}
                />
              </Animated.View>
            ))}
          </View>

          <TouchableOpacity style={styles.pauseButton} onPress={endGame}>
            <ThemedText style={styles.pauseButtonText}>End Game</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  title: {
    marginBottom: 10,
  },
  score: {
    fontSize: 24,
    marginBottom: 5,
  },
  highScore: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 5,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  startContainer: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  instructions: {
    marginBottom: 15,
    textAlign: 'center',
  },
  instructionsText: {
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  targetContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  targetLabel: {
    marginBottom: 15,
  },
  targetColorBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  colorButtonContainer: {
    margin: 10,
  },
  colorButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pauseButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
  },
  pauseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
