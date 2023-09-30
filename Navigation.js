// Navigation.js
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
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

    useEffect(() => {
      // Create a WebSocket connection
      const ws = new WebSocket(socket_url);
  
      // Add event listeners to handle WebSocket connection state
      ws.addEventListener('open', () => {
        setConnectionState('open');
        ws.send('owo uwu owaowa')
      });
  
      ws.addEventListener('close', () => {
        setConnectionState('closed');
        ws.send('sadge')
      });
  
      // Cleanup the WebSocket connection when the component unmounts
      return () => {
        ws.close();
        ws.send('bigger sadge')
      };
    }, []);

    if(connectionState == 'open') {
      return (
<NavigationContainer>
      <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name={"Details"} component={DetailsScreen}/>
                </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
      );
    }
    else {
      return (
        <Text>Closed</Text>
      );
    }
 
}

export default AppNavigation;
