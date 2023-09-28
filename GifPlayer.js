import React, { useState, useRef } from 'react';
import { View, Pressable, Image, StyleSheet, Animated, Easing } from 'react-native';
import debounce from 'lodash/debounce';

export default function GifPlayer() {
  const [isScaled, setIsScaled] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const startScaleAnimation = debounce(() => {
    const toValue = isScaled ? 1 : 1.5;

    Animated.timing(scaleValue, {
      toValue,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsScaled(!isScaled);
    });
  }, 0); // Adjust the debounce delay as needed

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={startScaleAnimation}>
        <Animated.View style={[styles.gifContainer, animatedStyle]}>
          <Image source={require('./assets/herta.gif')} style={styles.gifImage} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifContainer: {
    width: 200,
    height: 200,
  },
  gifImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
});
