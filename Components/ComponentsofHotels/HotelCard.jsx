import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { Entypo } from '@expo/vector-icons';

import RateCard from './RateCard';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function HotelCard({ headerData, id, mainImg, title, description, location, price, rate, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => { 
        navigation.navigate('DetailsHotel', { hotelId: id, headerData: headerData })
       }}
      style={styles.card} activeOpacity={0.8}>
      <Image
        style={styles.logo}
        source={{
          uri: mainImg
        }}
        resizeMode='stretch'
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginHorizontal: 20 }}>

        <View>
          <Text style={[styles.title, { fontSize: title.length < 15 ? width / 15 : width / 20 }]}>{title}</Text>
          <Text numberOfLines={3} style={styles.description}>{description}</Text>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
          <RateCard rate={rate} />
          <Text style={[styles.text, { color: 'red' }]}>{price}
            <Text style={styles.description}> /night</Text>
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="location-pin" size={20} color="white" />
            <Text style={styles.text}>{location}</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(24,24,24,0.5)',
    width: width - 30,
    borderRadius: 15,
    // alignItems: 'center',
    margin: 15,
    paddingBottom: 20
  },
  logo: {
    width: width - 30,
    height: height / 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // borderRadius: 15
  },
  title: {
    fontSize: width / 18,
    fontFamily: 'item',
    color: 'white'
  },
  description: {
    fontSize: 14,
    fontFamily: 'item',
    color: 'white',
    maxWidth: height / 3.3
  },
  text: {
    fontSize: 17,
    fontFamily: 'item',
    color: 'white',
  }
})