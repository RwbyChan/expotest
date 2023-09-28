import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SoundPlayer from './SoundPlayer';
import AnimatedGif from './AnimatedGif';
import VideoPlayer from './VideoPlayer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GifPlayer from './GifPlayer';


export default function App() {
  return (
    <GestureHandlerRootView>
      
      <GifPlayer></GifPlayer>
      <StatusBar style="auto" />
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
