import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  Alert,
  Button, 
  Image, 
  Platform, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import tw from 'tailwind-rn';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';

import useAuth from '../../hooks/useAuth';

const DUMMY_DATA = [
  {
    id: 1,
    firstName: 'Ze',
    lastName: 'Zinho',
    occupation: 'Padeiro',
    photoURL: 'https://agenciabrasilia.df.gov.br/wp-conteudo/uploads/2020/09/cat-256x364.jpg',
    age: '3'
  },
  {
    id: 2,
    firstName: 'Por',
    lastName: 'Quinho',
    occupation: 'Testador de camas',
    photoURL: 'https://www.dicaspetz.com.br/wp-content/uploads/2020/08/cat-sitter-pet.jpg',
    age: '6'
  },
  {
    id: 3,
    firstName: 'Tigrinho',
    lastName: 'Feroz',
    occupation: 'Aposentado',
    photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToJey2FR2kEDYmQSQZFMwo0ia0s34xMvFxZA&usqp=CAU',
    age: '5'
  },
  {
    id: 4,
    firstName: 'Sr',
    lastName: 'Punzinho',
    occupation: 'Modelo',
    photoURL: 'https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg',
    age: '7'
  },
]

export function HomeScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);

  function handleGoToChat() {
    navigation.navigate('Chat');
  }

  function handleOpenModal() {
    navigation.navigate('Modal');
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

        <TouchableOpacity onPress={handleOpenModal} >
          <Image 
            source={require('../../assets/logo.jpg')}
            style={tw('h-14 w-12')}
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

      {/* Cards */}
      <View style={tw('flex-1 -mt-6')}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: 'transparent'}}
          cards={DUMMY_DATA} 
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log('Swipe PASS');
          }}
          onSwipedRight={() => {
            console.log('Swipe MATCH');
          }}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: '#F00'
                }
              }
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  color: '#4DED30'
                }
              }
            }
          }}
          renderCard={(card) => (
            <View
              key={card.id}
              style={tw('relative bg-white h-3/4 rounded-xl')}
            >
              <Image 
                source={{ uri: card.photoURL}} 
                style={tw('h-full w-full rounded-xl')}
              />

              <View 
                style={[
                  tw('absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl'),
                  styles.cardShadow
                ]}
              >
                <View>
                  <Text style={tw('text-xl font-bold')}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>
                    {card.occupation}
                  </Text>
                </View>

                <Text style={tw('text-2xl font-bold')}>
                  {card.age}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={tw('flex flex-row justify-evenly')}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw('items-center justify-center rounded-full w-16 h-16 bg-red-200')}
        >
          <Entypo name='cross' size={24} color='red' />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-200')}
        >
          <AntDesign name='heart' size={24} color='green' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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

    elevation: 2
  }
});
