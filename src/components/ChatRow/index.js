import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from 'tailwind-rn';

import useAuth from "../../hooks/useAuth";
import { getMatchedUserInfo } from '../../utils/getMatchedUserInfo';

export function ChatRow({ matchDetails }) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.user, user.uid));
  }, [matchDetails, user]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Message', matchDetails)}
      style={[
        tw('flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg'),
        styles.cardShadow
      ]}
    >
      <Image 
        source={{ uri: matchedUserInfo?.photoURL }}
        style={tw('rounded-full h-16 w-16 mr-4')}
      />

      <View>
        <Text style={tw('text-lg')}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  }
});
