import React from 'react';
import { Button, Text, View } from 'react-native';

import useAuth from '../../hooks/useAuth';

export function LoginScreen() {
  const { signInWithGoogle } = useAuth();

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title='Login' onPress={signInWithGoogle} />
    </View>
  );
}
