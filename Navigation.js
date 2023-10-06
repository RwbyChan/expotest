// Navigation.js
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailScreen';
import WebsocketClient from './WebsocketClient';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const [connectionState, setConnectionState] = useState(false);

  

  useEffect(() => {
    WebsocketClient.subscribeState((data) => {
      setConnectionState(data)
      console.log(data)
    })
  }, [])

    if(connectionState == 'OPEN') {
      return (
<NavigationContainer>
      <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ unmountOnBlur: false }} />
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
