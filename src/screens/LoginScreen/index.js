import React from 'react';
import { Button, Text, View } from 'react-native';

import useAuth from '../../hooks/useAuth';

export function LoginScreen() {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <View>
      <Text>{loading ? 'loading...' : 'Login to the app'}</Text>
      <Button title='Login' onPress={signInWithGoogle} />
    </View>
  );
}
