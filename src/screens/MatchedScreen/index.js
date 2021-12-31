import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from 'tailwind-rn';

export function MatchedScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  function handleNavigateToChat() {
    navigation.goBack();
    navigation.navigate('Chat');
  }

  return (
    <View style={[tw('h-full bg-red-500 pt-20'), { opacity: 0.89 }]}>
      <View style={tw('justify-center px-10 pt-20')}>
        <Image 
          source={{ uri: 'https://links.papareact.com/mg9' }}
          style={tw('h-20 w-full')}
        />
      </View>

      <Text style={tw('text-white text-center mt-5')}>
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View style={tw('flex-row justify-evenly mt-5')}>
        <Image
          source={{ uri: loggedInProfile.photoURL }}
          style={tw('h-32 w-32 rounded-full')}
        />

        <Image
          source={{ uri: userSwiped.photoURL }}
          style={tw('h-32 w-32 rounded-full')}
        />
      </View>

      <TouchableOpacity 
        onPress={handleNavigateToChat}
        style={tw('bg-white m-5 px-10 py-8 rounded-full mt-20')}
      >
        <Text style={tw('text-center')}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
}
