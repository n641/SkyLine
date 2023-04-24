import { StyleSheet, Text, View, Dimensions, FlatList, Animated, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors'

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import HeaderOfData from '../../../Components/ComponentsofHotels/HeaderOfData';
import HotelCard from '../../../Components/ComponentsofHotels/HotelCard';

import { Transition, Transitioning } from 'react-native-reanimated';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const transition = (
  <Transition.Together>
    <Transition.In type='slide-top' durationMs={500} />
    <Transition.Change />
    <Transition.Out type='slide-right' durationMs={500} />
  </Transition.Together>
);

export default function ResultHotels({navigation}) {
  const [Hotels, setHotels] = useState([
    {
      mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      title: 'IceLand',
      description: 'Hotel overlooks the sea and all rooms overlook the sea 24-hour service with meals',
      location: "Ne'ma bay",
      price: 250,
      rate: 4.5,
      id: 2

    },
    {
      mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      title: 'IceLand',
      description: 'Hotel overlooks the sea and all rooms overlook the sea 24-hour service with meals',
      location: "Ne'ma bay",
      price: 250,
      rate: 2.5,
      id: 3

    },
    {
      mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      title: 'IceLand',
      description: 'Hotel overlooks the sea and all rooms overlook the sea 24-hour service with meals',
      location: "Ne'ma bay",
      price: 250,
      rate: 4.5,
      id: 4

    },
    {
      mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      title: 'IceLand',
      description: 'Hotel overlooks the sea and all rooms overlook the sea 24-hour service with meals',
      location: "Ne'ma bay",
      price: 250,
      rate: 4.5,
      id: 5

    },
    {
      mainImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      title: 'IceLand',
      description: 'Hotel overlooks the sea and all rooms overlook the sea 24-hour service with meals',
      location: "Ne'ma bay",
      price: 250,
      rate: 4.5,
      id: 1
    },
  ])

  const ref = React.useRef();
  const FlatList_Header = () => {
    return (
      <Animated.View>
        <View style={{ marginLeft: 15, marginTop: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 15 }}>
          <AntDesign name="arrowleft" size={35} color="white" onPress={() => {
            navigation.goBack()
          }} />
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 30 }}>Hotels</Text>

          <FontAwesome5 name="filter" size={24} color="white" />

        </View>
        <HeaderOfData />
      </Animated.View>
    );
  }

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={{ flex: 1 }}
    >
      <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
        style={styles.linearGradient}>



        <FlatList
          data={Hotels}
          ListHeaderComponent={FlatList_Header}
          renderItem={({ item }) => (
            <HotelCard
              mainImg={item.mainImg}
              title={item.title}
              description={item.description}
              location={item.location}
              price={item.price}
              rate={item.rate}
              navigation={navigation}
            />

          )}
          keyExtractor={item => item.id}
        />


      </LinearGradient>

      <TouchableOpacity style={styles.container}>
        <Entypo name="map" size={30} color="white" />
        <Text style={styles.text}> Map</Text>
      </TouchableOpacity>

    </Transitioning.View>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-start',
    //alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'item',
    color: 'white',
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20,
    top: height - 70,
    left: width / 2.7
  }
})