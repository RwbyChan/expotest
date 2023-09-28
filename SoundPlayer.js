import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';

const MusicPlayer = () => {
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

  return (
    <View>
      <Button title="Play Random Song" onPress={playRandomSong} />
    </View>
  );
};

export default MusicPlayer;
