import React, { useRef, useState } from 'react';
import { View, Button } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

const { cond, eq, set, spring, startClock, stopClock, clockRunning, block, timing, debug, decay, call, Clock, Value } = Animated;

const runTiming = (clock, value, dest, duration, easing) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration,
    toValue: new Value(0),
    easing,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
};

const AnimatedGif = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const scale = useRef(new Value(1)).current;
  const gestureState = useRef(new Value(State.UNDETERMINED)).current;
  const gestureHandler = useRef(
    Animated.event([{ nativeEvent: { state: gestureState } }])
  ).current;

  const playGif = () => {
    setIsPlaying(true);
  };

  const onGifTap = () => {
    if (isPlaying) {
      setIsPlaying(false);
      scale.setValue(1);
    }
  };

  return (
    <View>
      <Button title="Play GIF" onPress={playGif} />
      <TapGestureHandler onHandlerStateChange={gestureHandler}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Animated.Image
            source={require('./assets/herta.gif')} // Replace with the path to your GIF file
            style={{
              width: 200,
              height: 200,
            }}
          />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default AnimatedGif;
