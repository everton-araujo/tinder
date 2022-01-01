import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';

import { ChatList } from '../../components/ChatList';
import { Header } from '../../components/Header';

export function ChatScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}
    >
      <Header title='Chat' />
      <ChatList />
    </SafeAreaView>
  );
}
