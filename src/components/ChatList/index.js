import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { onSnapshot, collection, query, where } from '@firebase/firestore';
import tw from 'tailwind-rn';

import { db } from '../../../firebase';
import useAuth from '../../hooks/useAuth';
import { ChatRow } from '../ChatRow';

export function ChatList() {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(() =>
    onSnapshot(
      query(
        collection(db, 'matches'), 
        where('usersMatched', 'array-contains', user.uid)
      ), 
      snapshot => setMatches(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })))
    ),
  [user]);

  return (
    matches.length > 0 ? (
      <FlatList
        data={matches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatRow matchDetails={item} />}
        style={tw('h-full')}
      />
    ) : (
      <View style={tw('p-5')}>
        <Text style={tw('text-center text-lg')}>
          No matches at the moment 😢
        </Text>
      </View>
    )
  );
}
