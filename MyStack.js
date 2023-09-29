import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
function Home() {
    return (
        <Text>Home</Text>
    )
}

function Notifications() {
    return (
        <Text>Notifications</Text>
    )
}
export default function MyStack() {
  const Stack = createNativeStackNavigator();


  return (
        <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
-
    </Stack.Navigator>
  );
}

