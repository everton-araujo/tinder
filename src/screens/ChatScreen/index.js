import React from 'react';
import { SafeAreaView, Text, StatusBar, Platform } from 'react-native';

export function ChatScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}
    >
      <Text>
        Chat Screen
      </Text>
    </SafeAreaView>
  )
}
