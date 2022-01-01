import React, { useState } from "react";
import { 
  SafeAreaView, 
  StatusBar, 
  Platform, 
  View, 
  TextInput, 
  Button, 
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import tw from 'tailwind-rn';

import { getMatchedUserInfo } from "../../utils/getMatchedUserInfo";
import useAuth from "../../hooks/useAuth";
import { Header } from "../../components/Header";
import { SenderMessage } from '../../components/SenderMessage';
import { ReceiverMessage } from '../../components/ReceiverMessage';

export function MessageScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const { params } = useRoute();

  const matchDetails = params;

  function sendMessage() {

  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}
    >
      <Header 
        title={getMatchedUserInfo(matchDetails.user, user.uid).displayName}
        callEnabled
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw('flex-1')}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={tw('pl-4')}
            keyExtractor={item => item.id}
            renderItem={({ item: message }) => 
              messages.userId === useState.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
      
        <View
          style={tw('flex-row justify-between items-center border-t border-gray-200 px-5 py-2')}
        >
          <TextInput
            style={tw('h-10 text-lg')}
            placeholder='Send Message...'
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />

          <Button
            onPress={sendMessage}
            title='Send'
            color='#FF5864'
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
