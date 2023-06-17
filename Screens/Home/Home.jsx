import { Animated, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground, TextInput, FlatList } from 'react-native'
import React from 'react'

import { useState, useEffect, useCallback } from 'react';
import { getMe } from '../../store/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import { Entypo } from '@expo/vector-icons';

import axios from '../../Api/axios';
import Colors from '../../Conestant/Colors';
import bg from '../../assets/bg-dark.jpg';

import BoxOfCategories from '../../Components/BoxOfCategories'
import DiscoundOffers from '../../Components/CompnentOfHomePage/DiscoundOffers';

import { LinearGradient } from "expo-linear-gradient";

import * as Linking from 'expo-linking';
import HistoryOfTickets from './Tickets/HistoryOfTickets';
import HistoryOfHotel from './Hotels/HistoryOfHotel';
import HotelsOffers from '../../Components/CompnentOfHomePage/HotelsOffers';
import CategriesOfCountry from '../../Components/CompnentOfHomePage/CategriesOfCountry';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default function Home({ showMenu, scaleValue, offsetValue, closeButtonOffset, menu, HandleSetShowMenu, close, currentTab, navigation }) {
  const dispatch = useDispatch();
  const getuser = useCallback(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    getuser();
  }, [dispatch]);

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
      // console.log("hi")
    }

    const subscription = Linking.addEventListener('url', handleDeepLinking);
    if (!data) {
      getinitalurl();
    }
    return () => subscription.remove();
  })
  // ///////////////////////////////////////////////////////////////////////////

  const Header = () => (
    <Animated.View style={{}}>

      <ImageBackground
        source={{
          uri:
            'https://plus.unsplash.com/premium_photo-1661768748610-9ecf1e2dc0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
        }}
        resizeMode='stretch'
        style={{
          width: width,
          height: height / 2.7,
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
        {/* , position:'absolute' , top:height/4 , alignSelf:'center' */}


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <BoxOfCategories title='Ticket' HandleNavigate={HandleNavigate} routename='BookTicketNavigator' />
          <BoxOfCategories title='Hotel' HandleNavigate={HandleNavigate} routename='BookHotelNavigator' />
          {/* <BoxOfCategories title='Agency' HandleNavigate={HandleNavigate} routename='BookTicketNavigator' /> */}
          {/* <BoxOfCategories title='Taki' HandleNavigate={HandleNavigate} routename='BookTicketNavigator' /> */}
        </View>

        <View style={{ position: 'absolute', top: height / 3.0, alignSelf: 'center' }}>

          {/* <CustomTF placeholder="where are you going?" keyboardType="default" type="" label="" width={(width - 50)} onAddText={HandleSearch} text={Search} white={true} /> */}

          <View style={[styles.container, { backgroundColor: 'rgba(30,30,30,0.8)' }]}>
            <Entypo name="location" size={24} color="white" style={{ marginHorizontal: 5 }} />
            <TextInput
              style={[styles.input, {
                width: width - 110,
                justifyContent: 'center',
                marginHorizontal: 10
              }]}
              onChangeText={HandleSearch}
              value={Search}
              placeholder={"where are you going?"}
              placeholderTextColor={"white"}
              keyboardType={"default"}
            />

          </View>
        </View>

      </ImageBackground>

      <CategriesOfCountry navigation={navigation} />
      <DiscoundOffers navigation={navigation} />
      <HotelsOffers navigation={navigation} />


      {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                  <Text style={{ fontFamily: 'item', fontSize: 25 }}>{data ? JSON.stringify(data) : "App don't open from deep link"}</Text>
                </View> */}

    </Animated.View>
  )

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

              <Animated.View style={{ marginBottom: 50 }}>
                <FlatList
                  ListHeaderComponent={Header}
                />
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

                : currentTab == "Hotels" ?
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
                    <HistoryOfHotel />
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
  },
  container: {
    height: 48,
    paddingHorizontal: 5,
    borderColor: "white",
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  input: {
    minHeight: 40,
    fontSize: 18,
    fontFamily: "item",
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: "white",
  },
})