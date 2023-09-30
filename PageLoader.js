import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import WS from 'react-native-websocket'
import AppNavigation from './Navigation';

export default function PageLoader() {
    const [connectionState, setConnectionState] = useState(false);
    const socket_url = 'wss://socketsbay.com/wss/v2/1/demo/';

    const onOpen = () => {
        console.log('connection opened');
        setConnectionState('open')
    };

    const onClose = () => {
        console.log('connection closed');
        setConnectionState('close')
    };

    const onError = () => {
        console.log('connection error');
    };

    const onMessage = (msg) => {
        console.log('message received', msg);
    };


    // conneco sov 
  return (
    <View style={styles.main}>
      <WS ref={ref => {this.ws = ref}} url={socket_url} onOpen={onOpen} onMessage={onMessage} onError={onError} onClose={onClose} reconnect></WS>
      { connectionState == 'open' ? (
        <AppNavigation></AppNavigation>
      ) : (
        <Text>Close</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
