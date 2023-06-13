import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, FlatList } from 'react-native'
import React from 'react'

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors';

import RateCard from '../../../Components/ComponentsofHotels/RateCard';
import CommetCard from '../../../Components/ComonentOfAirlines/CommetCard';

import { AntDesign } from '@expo/vector-icons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function DetialsCompany({ navigation, route }) {
  const { Data } = route.params;
  const comments = Data.comments

  return (
    <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
      style={styles.container}>


      <ImageBackground
        source={{
          uri: Data.backGroundImage
        }}
        style={{ height: height / 3.8, width: width, alignItems: 'center', justifyContent: 'flex-end' }}
      >
        <View style={{ alignSelf: 'flex-start', position: 'absolute', top: 30 }}>

          <AntDesign name="arrowleft" size={30} color="white" onPress={() => {
            navigation.goBack()
          }}
            style={{backgroundColor: 'rgba(24,24,24,0.7)', borderRadius: 8, marginHorizontal: 15, padding: 5 }}
          />
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: Data.airplaneCompanyPhoto,
              }}
            />
            <View>
              <Text style={styles.Headtitle}>{Data.airplaneName}</Text>
              <Text style={[styles.Headtitle, { color: 'gray', fontSize: 15 }]}>{Data.description}</Text>
              <View style={{ margin: 10 }}>
                <RateCard rate={Data?.rate} />
              </View>
            </View>
          </View>
        </View>


      </ImageBackground>

      <View style={{ marginTop: height / 12, margin: 0 }}>
        <Text style={[styles.Headtitle, { alignSelf: 'flex-start', marginLeft: 15, fontSize: 25 }]}>Comments</Text>
        <FlatList
          horizontal={true}
          data={comments}
          renderItem={({ item }) =>
            <CommetCard
              navigation={navigation}
              item={item}
            />}
          keyExtractor={item => item._id}
        />
      </View>

      <View style={{ marginTop: 10, margin: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={[styles.Headtitle, { alignSelf: 'flex-start', marginLeft: 15, fontSize: 25 }]}>Tickets</Text>
          <Text style={[styles.Headtitle, { fontSize: 15, marginRight: 10, color: "gray" }]}
            onPress={() => { }}
          >View All</Text>

        </View>
        <FlatList
          horizontal={true}
          data={comments}
          renderItem={({ item }) =>
            <CommetCard
              navigation={navigation}
              item={item}
            />}
          keyExtractor={item => item._id}
        />
      </View>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  tinyLogo:
  {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10,
    borderRadius: 15
  }
  , card: {
    position: 'absolute',
    // width: width / 3,
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 10,
    top: height / 6
  }, Headtitle: {
    fontSize: 18,
    fontFamily: 'item',
    textAlign: 'center',
    color: 'white'
  },
})