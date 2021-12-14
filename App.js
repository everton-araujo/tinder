import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// REMOVE AND RESOLVE WARNINGS
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import { StackNavigator } from './src/stack/StackNavigator';
import { AuthProvider } from './src/hooks/useAuth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
