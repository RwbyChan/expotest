import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SoundPlayer from './SoundPlayer';
import AnimatedGif from './AnimatedGif';
import VideoPlayer from './VideoPlayer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GifPlayer from './GifPlayer';
import MyStack from './MyStack';
import PageLoader from './PageLoader';
import AppNavigation from './Navigation';


export default function App() {
  return (
    <AppNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  },
});
