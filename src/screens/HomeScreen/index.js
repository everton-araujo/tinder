import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  Alert,
  Button, 
  Image, 
  Platform, 
  SafeAreaView, 
  StatusBar, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import tw from 'tailwind-rn';
import { antDesign, Entypo, Ionicons } from '@expo/vector-icons';

import useAuth from '../../hooks/useAuth';

export function HomeScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  function handleGoToChat() {
    navigation.navigate('Chat');
  }

  // TODO 
  // Make this function call an Alert to confirm the logout
  function handleLogout() {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Yes',
          onPress: () => logout
        },
        {
          text: 'No'
        }
      ]
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}
    >
      {/* Header */}
      <View style={tw('flex-row items-center justify-between px-5')}>
        <TouchableOpacity onPress={logout} >
          <Image 
            source={{ uri: user.photoURL }} 
            style={tw('h-10 w-10 rounded-full')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image 
            source={require('../../assets/logo.jpg')}
            style={tw('h-14 w-12')}
            si
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoToChat}>
          <Ionicons 
            name='chatbubbles-sharp' 
            size={30}
            color='#FF5864'
          />
        </TouchableOpacity>
      </View>


      {/* <Text>
        Home Screen
      </Text>

      <Button 
        title='Go to Chat'
        onPress={handleGoToChat}
      />

      <Button 
        title='Logout'
        onPress={logout}
      /> */}
    </SafeAreaView>
  );
}
