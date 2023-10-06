// HomeScreen.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import WebsocketClient from './WebsocketClient';
import YoutubePlayer from "react-native-youtube-iframe";
import { usePlayerState } from './PlayerStateContext';
import { WebView } from 'react-native-webview';

function HomeScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef();

  const { isPlaying, play, pause } = usePlayerState();

  useEffect(() => {
    WebsocketClient.subscribe((data) => {

      if(data.type == 'chat') {
        console.log('messages', messages);
        setMessages((prevMessages) => [...prevMessages, data.msg]);
        console.log('pushed', messages)
      }
    })


  }, [])

  useEffect(() => {
    console.log('msg', messages)
  }, [messages])

  const onStateChange = useCallback((state) => {
    console.log(state)
    if (state === "ended") {
      // setPlaying(false);
      // Alert.alert("video has finished playing!");
    }

    if(state === 'paused') {
      pause()
      play()
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>

      <WebView
          source={{ uri: 'https://www.youtube.com/embed/fcqhvcWv390?playsinline=1' }}
          style={{ flex: 1, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          allowsInlineMediaPlayback={true}
        onLoadStart={() => console.log('WebView loading started')}
        onLoadEnd={() => console.log('WebView loading finished')}
        onError={(error) => console.error('WebView error:', error)}
        />
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      { messages.map((msg, index) => 
        ( <Text key={index}>{msg}</Text> )
      )}
    </View>
  );
}

export default HomeScreen;
