import { StyleSheet, Text, View, ImageBackground, Dimensions, StatusBar } from 'react-native'
import React from 'react'

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../../../Conestant/Colors';

import bg from '../../../assets/bg-dark.jpg';
import TabBarOFSearchTickets from '../../../Components/SubScreensOfTicket/TabBarOFSearchTickets';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function TicketSearch({ navigation }) {
  return (
    <View>
      <StatusBar hidden={true} />
      <ImageBackground
        source={bg}
        resizeMode='repeat'
        style={{
          width: width,
          height: height + 50,
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <AntDesign name="arrowleft" size={30} color="white" onPress={() => {
            navigation.goBack()
          }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 1 }}>
            <View style={{ backgroundColor: 'rgba(24,24,24,0.7)', borderRadius: 8, marginHorizontal: 15, padding: 5 }}>
              <Entypo name="home" size={30} color="blue" onPress={()=>{
                navigation.navigate("Home")
              }} />
            </View>
            <View style={{ backgroundColor: 'rgba(24,24,24,0.7)', borderRadius: 8, padding: 5 , marginRight: 5 }}>
              <MaterialIcons name="flight" size={30} color="red" 
              onPress={()=>{
                navigation.navigate("ListCompanies")
              }} />
            </View>
          </View>
        </View>

        <View style={{
          alignItems: 'center',
          marginBottom: 75, 
        }}>

          <Text style={styles.title}>Flight search</Text>

        </View>



        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
          style={styles.container}>

          <TabBarOFSearchTickets navigation={navigation} />

        </LinearGradient>

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: (height + 50) / 1.3,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80
  },
  title: {
    fontFamily: 'item',
    color: "white",
    fontSize: 30,
  },

})