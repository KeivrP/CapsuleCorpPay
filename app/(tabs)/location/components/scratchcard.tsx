import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, LayoutChangeEvent, StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import {
  Canvas,
  Group,
  Skia,
  Path,
  Mask,
  Rect,
  Image,
  useImage,
  SkPath,
} from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  runOnJS,
  useSharedValue,
  withTiming,
  Easing
} from 'react-native-reanimated';

interface ILayersProps {
  width: number;
  height: number;
}

const Offer = ({ width, height }: ILayersProps) => {
  const offerImage = useImage(require('./offer.png'));
  return (
    offerImage && (
      <Image image={offerImage} fit="contain" width={width} height={height} />
    )
  );
};

const ScratchPattern = ({ width, height }: ILayersProps) => {
  const scratchPatternImage = useImage(require('./scratch-pattern.jpg'));
  return (
    scratchPatternImage && (
      <Image
        image={scratchPatternImage}
        fit="cover"
        width={width}
        height={height}
      />
    )
  );
};

export const ScratchCard = () => {
  const [canvasLayoutMeta, setCanvasLayoutMeta] = useState({
    width: 0,
    height: 0,
  });

  const STROKE_WIDTH = useRef<number>(40);
  const totalAreaScratched = useRef<number>(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose'>('lose');
  const [paths, setPaths] = useState<SkPath[]>([]);

  // Shared values
  const isDisabled = useSharedValue(false);
  const scratchProgress = useSharedValue(0);

  // Determine game outcome
  const determineGameOutcome = (areaScratched: number) => {
    // Calculate the probability of winning based on the area scratched
  
    // Generate a random number between 0 and 1
    const randomValue = Math.random();

    console.log(randomValue > 0.5)
  
    // If the random value is less than the win probability, the player wins
    return randomValue > 0.5 ? showResultModal('win') : showResultModal('lose');
  };

  

  // Workletized state update functions
  const updatePathsWorklet = (newPaths: SkPath[]) => {
    'worklet';
    runOnJS(setPaths)(newPaths);
  };

  const showResultModal = (result: 'win' | 'lose') => {
    console.log(result)
    setGameResult(result);
    setIsModalVisible(true);
  };

  const pan = Gesture.Pan()
    .onStart((g) => {
      'worklet';
      if (isDisabled.value) return;
      const newPaths = [...paths];
      const path = Skia.Path.Make();
      path.moveTo(g.x, g.y);
      newPaths.push(path);
      updatePathsWorklet(newPaths);
    })
    .onUpdate((g) => {
      'worklet';
      if (isDisabled.value) return;

      const newPaths = [...paths];
      const path = newPaths[newPaths.length - 1];
      if (path) {
        path.lineTo(g.x, g.y);
        updatePathsWorklet(newPaths);
      }
    })
    .onEnd(() => {
      'worklet';
      if (isDisabled.value || paths.length === 0) return;

      const path = paths[paths.length - 1];
      const pathLength = path.toSVGString().length;
      const pathArea = pathLength * STROKE_WIDTH.current;

      totalAreaScratched.current += pathArea;
      const {width, height} = canvasLayoutMeta;
      const areaScratched = (totalAreaScratched.current / (width * height)) * 100;

      scratchProgress.value = withTiming(areaScratched, {
        duration: 10,
        easing: Easing.linear
      });

      if (areaScratched > 30) {
        // Determine game outcome when scratched more than 30%
        const result = runOnJS(determineGameOutcome)(areaScratched);
     
        isDisabled.value = true;
      }
    })
    .minDistance(1);

  const handleCanvasLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setCanvasLayoutMeta({ width, height });
  }, []);

  const handleReset = useCallback(() => {
    setPaths([]);
    totalAreaScratched.current = 0;
    isDisabled.value = false;
    scratchProgress.value = 0;
    setIsModalVisible(false);
  }, [isDisabled, scratchProgress]);

  const { width, height } = useMemo(() => canvasLayoutMeta, [canvasLayoutMeta]);

  return (
    <>
      <GestureDetector gesture={pan}>
        <View style={styles.container}>
          <Canvas onLayout={handleCanvasLayout} style={styles.canvas}>
            <Offer width={width} height={height} />
            {!isModalVisible ? (
              <Mask
                clip
                mode="luminance"
                mask={
                  <Group>
                    <Rect
                      x={0}
                      y={0}
                      width={width}
                      height={height}
                      color="white"
                    />
                    {paths.map(p => (
                      <Path
                        key={p.toSVGString()}
                        path={p}
                        strokeWidth={STROKE_WIDTH.current}
                        style="stroke"
                        strokeJoin={'round'}
                        strokeCap={'round'}
                        antiAlias
                        color={'black'}
                      />
                    ))}
                  </Group>
                }>
                <ScratchPattern width={width} height={height} />
              </Mask>
            ) : (
              <Offer width={width} height={height} />
            )}
          </Canvas>
          <View style={styles.buttonContainer}>
            <Button title="Reset" onPress={handleReset} />
          </View>
        </View>
      </GestureDetector>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {gameResult === 'win' ? '¡Felicidades!' : 'Sigue Intentando'}
            </Text>
            <Text style={styles.modalText}>
              {gameResult === 'win' 
                ? '¡Has ganado un premio increíble!' 
                : 'Casi lo logras. ¡Intenta de nuevo!'}
            </Text>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={handleReset}
            >
              <Text style={styles.modalButtonText}>
                {gameResult === 'win' ? 'Nuevo Juego' : 'Reintentar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '55%',
    backgroundColor: '#06D6A0',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  modalButton: {
    backgroundColor: '#06D6A0',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScratchCard;