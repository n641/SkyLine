import { StyleSheet, Text, View, Dimensions, FlatList, Animated, TouchableOpacity , ActivityIndicator } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'

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

export default function ResultHotels({ navigation, route }) {
  const { location, headerData } = route.params;
  const [Loading, setLoading] = useState(true)
  const [Hotels, setHotels] = useState([])
  const [dataLenght, setdataLenght] = useState();
  const ref = React.useRef();

  const url = `https://skyline-backend.cyclic.app/api/v1/hotels?hotelName=${location}`
  const fetchData = async () => {
    const resp = await fetch(url).catch(error => console.log(error.message));
    const data = await resp.json();
    setHotels(data.data)
    setdataLenght(data.results)
    if (!data) {
      setdataLenght(0)
      return
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);


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
        <HeaderOfData headerData={headerData} />
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

        {Loading &&
          <View style={{
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ActivityIndicator size={70} color={'#00ff00'} />
          </View>
        }

        <FlatList
          data={Hotels}
          ListHeaderComponent={FlatList_Header}
          renderItem={({ item }) => (
            <HotelCard
              id={item._id}
              mainImg={item.hotelPhoto}
              title={item.hotelName}
              description={item.description}
              location={item.city}
              price={item.price}
              rate={item.ratingsAverage}
              navigation={navigation}
              headerData={headerData}
            />
          )}
          keyExtractor={item => item._id}
        />

      </LinearGradient>

      <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate('MapViews', { Hotels: Hotels, headerData: headerData }) }}>
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