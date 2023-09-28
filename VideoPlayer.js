import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Video, Audio } from 'expo-av';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [sound, setSound] = useState();
  const songs = [
    require('./assets/Kururin.mp3'),
    require('./assets/Kurukuru.mp3'),
    // Add more songs as needed
  ];

  const playRandomSong = async () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const selectedSong = songs[randomIndex];

    if (sound) {
      await sound.unloadAsync(); // Stop any currently playing sound
    }

    const { sound: newSound } = await Audio.Sound.createAsync(selectedSong);
    setSound(newSound);
    await newSound.playAsync();
  };

  useEffect(() => {
    // Load the video when the component mounts
    loadVideo();
  }, []);

  const loadVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.loadAsync(
        require('./assets/herta.mp4') // Replace with the path to your video file
      );
      videoRef.current.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          // When the video finishes, set it back to the first frame
          videoRef.current.setPositionAsync(0);
          setIsPlaying(false);
        }
      });
    }
  };

  const playVideo = async () => {
    if (videoRef.current) {
      // Play the video
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const handleVideoTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      // If not playing, start playing
      if (!isPlaying) {
        playVideo();
        playRandomSong();
      }
    }
  };

  return (
    <View>
      <TapGestureHandler onHandlerStateChange={handleVideoTap}>
        <View>
          <Video
            ref={videoRef}
            source={{ uri: '' }} // Video source will be set dynamically
            shouldPlay={isPlaying}
            isLooping={false} // Disable looping
            style={{ width: 300, height: 200 }} // Adjust the size as needed
            resizeMode="contain"
          />
        </View>
      </TapGestureHandler>
    </View>
  );
};

export default VideoPlayer;
