import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  Text,
  Animated
} from "react-native";

import React, { useRef, useState, useMemo, useCallback } from "react";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import bg from '../../../assets/bg-dark.jpg';

import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import CardOfTicket from "../../../Components/ComponentsOfTicket/CardOfTicket";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function ResultTicketsScreen({ navigation }) {

  const [Tickets, setTickets] = useState([
    {
      image: 'https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png',
      flightNum: 'EY120',
      From: 'Tokyo',
      TO: 'Tokyo',
      DateFrom: '16:24',
      DateTo: '20:24',
      duration: "4H 0m",
      date: '01 January 2023',
      gate: '4',
      sala: '2',
      class: 'Economy',
      bag: 1,
      price: '50',
      id: '1'
    },
    {
      image: 'https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png',
      flightNum: 'EY120',
      From: 'Tokyo',
      TO: 'Tokyo',
      DateFrom: '16:24',
      DateTo: '20:24',
      duration: "4H 0m",
      date: '01 January 2023',
      gate: '4',
      sala: '2',
      class: 'Economy',
      bag: 1,
      price: '50',
      id: '2'
    },
    {
      image: 'https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png',
      flightNum: 'EY120',
      From: 'Tokyo',
      TO: 'Tokyo',
      DateFrom: '16:24',
      DateTo: '20:24',
      duration: "4H 0m",
      date: '01 January 2023',
      gate: '4',
      sala: '2',
      class: 'Economy',
      bag: 1,
      price: '50',
      id: '3'
    },
  ])

  const [IsOpen, setIsOpen] = useState(false)
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "48%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }, []);

  const handleSheetChanges = useCallback((index) => {
    // setTextOfPassenger(`Adults: ${Adult} , Children: ${Children} ,  infant: ${infant}`)
  }, []);

  const HandleOpenSheet = () => {
    handlePresentModalPress()
  }


  return (
    <ImageBackground
      source={bg}
      resizeMode='cover'
      style={{
        width: width,
        height: height + 50,
      }}
    >

      <View style={{ marginTop: 20, marginBottom: 290 }}>

        <AirplaneData navigation={navigation} Filter={true} title='Flight Search' HandleOpenSheet={HandleOpenSheet} />

        <FlatList
          data={Tickets}
          renderItem={({ item }) => <CardOfTicket
            image={item.image}
            flightNum={item.flightNum}
            From={item.From}
            TO={item.TO}
            DateFrom={item.DateFrom}
            DateTo={item.DateTo}
            duration={item.duration}
            date={item.date}
            gate={item.gate}
            sala={item.sala}
            classs={item.class}
            bag={item.bag}
            price={item.price}
            navigation={navigation}
          />}
          keyExtractor={item => item.id}
        />

      </View>

      <BottomSheetModalProvider>
        <Animated.View style={styles.container}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            // onChange={handleSheetChanges}
            onDismiss={() => {
              // handleSheetChanges()
              setIsOpen(false)
            }}
          >

          </BottomSheetModal>
        </Animated.View>
      </BottomSheetModalProvider>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },

})