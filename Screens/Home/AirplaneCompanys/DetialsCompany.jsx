import { StyleSheet, Text, View, ImageBackground, Dimensions ,Image } from 'react-native'
import React from 'react'

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function DetialsCompany({ navigation, route }) {
  const { Data } = route.params;
  console.log(Data)

  return (
    <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
      style={styles.container}>

      <ImageBackground
        source={{
          uri: Data.backGroundImage
        }}
        style={{ height: height / 4, width: width }}
      >
        <View style={styles.card}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: Data.airplaneCompanyPhoto,
            }}
          />
        </View>
      </ImageBackground>
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
      marginRight: 10
  }
  ,card:{
    
  }
})