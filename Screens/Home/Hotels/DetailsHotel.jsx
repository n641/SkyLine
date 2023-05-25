import { StyleSheet, Text, View, Animated, FlatList, Dimensions, Image, ScrollView } from 'react-native'
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors'

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import Paginator from '../../../Components/OnboardingItem/Paginator';
import RateCard from '../../../Components/ComponentsofHotels/RateCard';
import MainButton from '../../../Components/MainButton'
import DetailsBottomSheet from '../../../Components/ComponentsofHotels/DetailsBottomSheet';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function DetailsHotel({ navigation, route }) {

  const { hotelId, headerData } = route.params;
  const [data, setdata] = useState()
  const [heart, setheart] = useState("heart")
  const [Sliders, setSliders] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null)
  const [IsOpen, setIsOpen] = useState(true)
  const bottomSheetModalRef = useRef(null);

  const url = `https://skyline-backend.cyclic.app/api/v1/hotels/${hotelId}`
  const fetchData = async () => {
    const resp = await fetch(url).catch(error => console.log(error.message));
    const data = await resp.json();
    setdata(data.data.data)
    setSliders(data.data.data.images)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const snapPoints = useMemo(() => [height - 190, height - 370, height], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.Container, { width: width }]}>
        <Image
          style={{ width: width, height: height + 50 }}
          source={{
            uri: item
          }}
          resizeMode='stretch'
        />
      </View>
    )
  }

  return (
    <View>

      <FlatList
        data={Sliders}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={{ margin: 10, position: 'absolute', top: height / 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width - 20 }}>
        <AntDesign name="arrowleft" size={35} color="white" onPress={() => {
          navigation.goBack()
        }} />
        <Text style={[styles.title, { fontSize: 28, top: 30 }]} >Details Hotel</Text>
        <AntDesign name={heart} size={24} color="red" onPress={() => { heart == "heart" ? setheart("hearto") : setheart("heart") }} />

      </View>

      <View style={{ position: 'absolute', top: height - 250, left: width / 8.5, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>{data?.hotelName}</Text>
            {/* problem */}
            <RateCard rate={2} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Entypo name="location-pin" size={20} color="white" />
              <Text style={styles.text}>{data?.city}</Text>
            </View>
          </View>

          <View style={{ marginLeft: -height / 39, marginTop: height / 10, width: 50 }}>
            <MainButton title={'Book'} onClick={() => {
              navigation.navigate('BookRoom', { data: data._id, headerData: headerData })
            }} />
          </View>

        </View>
      </View>

      <View style={{ position: 'absolute', top: height - 95, left: width / 2.7 }}>
        <Paginator data={Sliders} scrollX={scrollX} />
      </View>
      <View style={{ position: 'absolute', top: height - 50, left: width / 3 }}>
        <Text onPress={() => { handlePresentModalPress(!IsOpen) }} style={[styles.text, { fontSize: 24 }]}>more details  ^</Text>
      </View>




      <BottomSheetModalProvider>
        <Animated.View >
          <BottomSheetModal
            backgroundStyle={{
              backgroundColor: Colors.first_dark_screen,
              flexGrow: 1
            }}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onDismiss={() => {
              setIsOpen(false)
              // handleSheetChanges()
            }}
          >
            <DetailsBottomSheet navigation={navigation} data={data} />
          </BottomSheetModal>
        </Animated.View>
      </BottomSheetModalProvider>

    </View >


  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flexGrow: 1,
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15

  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'rgba(24,24,24,0.8)',
    width: width / 1.3,
    height: height / 4.5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  title: {
    fontSize: 30,
    fontFamily: 'item',
    color: 'white',
    marginBottom: 5
  },
  text: {
    fontSize: 17,
    fontFamily: 'item',
    color: 'white',
    marginVertical: 10
  }
})