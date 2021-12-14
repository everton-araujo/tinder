import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

import useAuth from '../../hooks/useAuth';

export function HomeScreen() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  function handleGoToChat() {
    navigation.navigate('Chat');
  }

  return (
    <View>
      <Text>
        Home Screen
      </Text>

      <Button 
        title='Go to Chat'
        onPress={handleGoToChat}
      />

      <Button 
        title='Logout'
        onPress={logout}
      />
    </View>
  );
}
