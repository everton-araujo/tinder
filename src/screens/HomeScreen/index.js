import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

export function HomeScreen() {
  const navigation = useNavigation();

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
    </View>
  )
}
