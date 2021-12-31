import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useAuth from '../hooks/useAuth';
import { HomeScreen } from '../screens/HomeScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ModalScreen } from '../screens/ModalScreen';
import { MatchedScreen } from '../screens/MatchedScreen';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      {
        !user
        ? (
          <Stack.Screen name='Login' component={LoginScreen} />
        ) : (
          <>
            <Stack.Group>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='Chat' component={ChatScreen} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name='Modal' component={ModalScreen} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
              <Stack.Screen name='Match' component={MatchedScreen} />
            </Stack.Group>
          </>
        )
      }
    </Stack.Navigator>
  );
}
