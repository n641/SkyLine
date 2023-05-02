import { Animated, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'

import axios from '../../Api/axios';
import Colors from '../../Conestant/Colors';
import bg from '../../assets/bg-dark.jpg';

import CustomTF from '../../Components/CustomeTextFields/CustomTF';
import BoxOfCategories from '../../Components/BoxOfCategories'

import { LinearGradient } from "expo-linear-gradient";

import * as Linking from 'expo-linking';
import HistoryOfTickets from './Tickets/HistoryOfTickets';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default function Home({ showMenu, scaleValue, offsetValue, closeButtonOffset, menu, HandleSetShowMenu, close, currentTab, navigation }) {

  const [Search, setSearch] = useState()

  const [DataOfUser, setDataOfUser] = useState()
  var url = `https://skyline-backend.cyclic.app/api/v1/users/me`;
  const fetchData = async () => {
    const response = await axios.get(url,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      .catch(error => {
        console.log(error)
      })
    if (response) {
      setDataOfUser(response.data.data.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const HandleDrawer = () => {
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true
    }).start()

    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : 230,
      duration: 300,
      useNativeDriver: true
    }).start()

    Animated.timing(closeButtonOffset, {
      toValue: !showMenu ? -30 : 0,
      duration: 300,
      useNativeDriver: true
    }).start()

    HandleSetShowMenu(!showMenu)
  }

  const HandleSearch = (val) => {
    setSearch(val)
  }

  const HandleNavigate = (name) => {
    navigation.navigate(name)
  }

  // ///////////////////////////////deep linking///////////////////////////////////////////////

  const [data, setdata] = useState()

  const handleDeepLinking = (event) => {
    let data = Linking.parse(event.url)
    setdata(data)
  }

  useEffect(() => {
    async function getinitalurl() {  // if app in background and start it this method will call and restore data from link init the deep link
      const initalurl = await Linking.getInitialURL();
      if (initalurl) setdata(Linking.parse(initalurl))
      console.log("hi")
    }

    const subscription = Linking.addEventListener('url', handleDeepLinking);
    if (!data) {
      getinitalurl();
    }
    return () => subscription.remove();
  })
  // ///////////////////////////////////////////////////////////////////////////


  return (
    <Animated.View style={{
      flex: 1,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      transform: [
        { scale: scaleValue },
        { translateX: offsetValue }
      ]
    }}>
      <StatusBar hidden={true} />

      <LinearGradient colors={[Colors.first_dark_splash, Colors.second_dark_splash, Colors.second_dark_splash, Colors.fourth_dark_splash]}
        style={{
          height: height + 50,
          borderRadius: showMenu ? 15 : 0,
        }}
      >

        <Animated.View style={{
          paddingVertical: 0,
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>

          {
            currentTab == "Home" ?

              <Animated.View style={{}}>

                <ImageBackground source={bg}
                  resizeMode='stretch'
                  borderRadius={15}
                  borderBottomLeftRadius={50}
                  borderBottomRightRadius={50}
                  style={{
                    width: width,
                    height: height / 2.4,
                  }}>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 40,
                      marginLeft: 15,
                      alignItems: 'center',
                    }}>

                    <TouchableOpacity onPress={() => {
                      HandleDrawer()
                    }}>
                      <Image source={showMenu ? close : menu} style={{
                        width: 26,
                        height: 25,
                        tintColor: 'white',
                      }} />
                    </TouchableOpacity>

                    <Text style={styles.title}> hi,{DataOfUser?.firstName}</Text>

                  </View>

                  <Text style={styles.desc}>Let's discover a new advanture </Text>


                  <CustomTF placeholder="where are you going?" keyboardType="default" type="" label="" width={(width - 50)} onAddText={HandleSearch} text={Search} white={true} />

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <BoxOfCategories title='Ticket' HandleNavigate={HandleNavigate} routename='BookTicketNavigator' />
                    <BoxOfCategories title='Hotel' HandleNavigate={HandleNavigate} routename='BookHotelNavigator' />
                    <BoxOfCategories title='Agency' HandleNavigate={HandleNavigate} routename='BookTicketNavigator' />
                    <BoxOfCategories title='Taki' HandleNavigate={HandleNavigate} routename='BookTicketNavigator' />

                  </View>

                </ImageBackground>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                  <Text style={{ fontFamily: 'item', fontSize: 25 }}>{data ? JSON.stringify(data) : "App don't open from deep link"}</Text>
                </View>

              </Animated.View>

              : currentTab == "Tickets" ?

                <View style={{ marginTop: 35, margin: 15 }}>

                  <TouchableOpacity onPress={() => {
                    HandleDrawer()
                  }}>
                    <Image source={showMenu ? close : menu} style={{
                      width: 26,
                      height: 25,
                      tintColor: 'white',
                    }} />
                  </TouchableOpacity>

                  <HistoryOfTickets />
                </View>

                :
                <View>
                  <Text>nononononoonon</Text>
                </View>
          }

        </Animated.View>
      </LinearGradient >
    </Animated.View >


  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  title: {
    fontFamily: 'item',
    color: "white",
    fontSize: 25,
    marginLeft: 10
  },
  desc: {
    fontFamily: 'item',
    color: "white",
    fontSize: 20,
    marginLeft: 30,
    marginTop: 5
  }
})