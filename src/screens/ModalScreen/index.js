import React, { useState } from "react";
import { Image, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from 'tailwind-rn';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

import useAuth from "../../hooks/useAuth";
import { db } from "../../../firebase";

export function ModalScreen() {
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  
  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, 'user', user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp()
    }).then(() => {
      navigation.navigate('Home')
    }).catch(error => {
      alert(error.message);
    });
  }

  return (
    <View style={[
      tw('flex-1 items-center pt-1'),
      {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }  
    ]}>
      <Image
        style={tw('h-20 w-full')}
        resizeMode="contain"
        source={{ uri: 'https://links.papareact.com/2pf' }}
      />

      <Text style={tw('text-xl text-gray-500 p-2 font-bold')}>
        Welcome {user.displayName}
      </Text>

      <Text style={tw('text-center p-4 font-bold text-red-400')}>
        Step 1: The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={text => setImage(text)}
        style={tw('text-center text-xl pb-2')}
        placeholder='Enter a Profile pic URL'
      />

      <Text style={tw('text-center p-4 font-bold text-red-400')}>
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={text => setJob(text)}
        style={tw('text-center text-xl pb-2')}
        placeholder='Enter your occupation'
      />

      <Text style={tw('text-center p-4 font-bold text-red-400')}>
        Step 3: The Age
      </Text>
      <TextInput
        value={age}
        onChangeText={text => setAge(text)}
        style={tw('text-center text-xl pb-2')}
        placeholder='Enter your age'
        keyboardType='numeric'
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        style={[
          tw(`w-64 p-3 rounded-xl absolute ${Platform.OS === 'android' ? 'bottom-5' : 'bottom-10'} bg-red-400`),
          incompleteForm ? tw('bg-gray-400') : tw('bg-red-400')
        ]}
      >
        <Text style={tw('text-center text-white text-xl')}>
          Update Profile
        </Text>
      </TouchableOpacity>

    </View>
  );
}
