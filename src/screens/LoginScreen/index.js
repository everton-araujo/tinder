import React, { useLayoutEffect } from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-rn';

import useAuth from '../../hooks/useAuth';

export function LoginScreen() {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={tw('flex-1')}>
      <ImageBackground
        source={{ uri: 'https://tinder.com/static/tinder.png' }}
        resizeMode='cover'
        style={tw('flex-1')}
      >
        <TouchableOpacity 
          style={[
            tw('absolute bottom-40 w-52 bg-white p-4 rounded-2xl'), 
            { marginHorizontal: '25%' }
          ]}
          onPress={signInWithGoogle}
        >
          <Text style={tw('text-center')}>
            {loading ? 'loading...' : 'Sign in & get swiping'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
