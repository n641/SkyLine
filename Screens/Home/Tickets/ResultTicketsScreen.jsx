import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  Text,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from "react-native";

import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { BottomSheetModal, BottomSheetModalProvider, } from "@gorhom/bottom-sheet";
import axios from "../../../Api/axios";
import { RadioButton } from 'react-native-paper';

import CAlert from "../../../Components/CustomeAlerts/CAlert";
import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import CardOfTicket from "../../../Components/ComponentsOfTicket/CardOfTicket";
import InputRange from "../../../Components/InputRange";
import BottomSheetTickets from "../../../Components/FilterTicketsComponent/BottomSheetTickets";

import bg from '../../../assets/bg-dark.jpg';
import wrong from '../../../assets/warning.png';
import Empty from "../../../Components/AnimatedImg/Empty";
import Loading from "../../../Components/AnimatedImg/Loading";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function ResultTicketsScreen({ navigation, route }) {

  const { from, to, classes, date, date2, type } = route.params;

  const [loading, setLoading] = useState(true);

  const [Tickets, setTickets] = useState([])

  const [IsOpen, setIsOpen] = useState(false)

  const [Filtermin, setFiltermin] = useState(0);
  const [Filtermax, setFiltermax] = useState(1000);
  const [dataLenght, setdataLenght] = useState(null);
  const [Rate, setRate] = useState(0)

  const HandleFilterRate = (number) => {
    setRate(number)
  }

  const HandleFiltermin = (number) => {
    setFiltermin(number)
  }

  const HandleFiltermax = (number) => {
    setFiltermax(number)
  }


  ///////////////////////////////////////general url///////////////////////////////

  var url = ``;

  if (type == "oneway") {
    if (to == "Every Where") {
      url = `https://skyline-backend.cyclic.app/api/v1/flights?classes=${classes}&from=${from}&date=${date}`
    } else {
      url = `https://skyline-backend.cyclic.app/api/v1/flights?classes=${classes}&from=${from}&to=${to}&date=${date}`
    }
  } else if (type == "RoundTrip") {
    if (to == "Every Where") {
      console.log(from)
      url = `https://skyline-backend.cyclic.app/api/v1/flights/round-trip?from=${from}&classes=${classes}&firstDate=${date}&lastDate=${date2}`
    } else {
      url = `https://skyline-backend.cyclic.app/api/v1/flights/round-trip?from=${from}&to=${to}&classes=${classes}&&firstDate=${date}&lastDate=${date2}`
    }
  } else {
    if (to == "Every Where") {
      url = `https://skyline-backend.cyclic.app/api/v1/flights/multiDestinations?from=${from}&firstDate=${date}`  ////problem there is no to field
    } else {
      url = `https://skyline-backend.cyclic.app/api/v1/flights/multiDestinations?from=${from}&to=${to}&firstDate=${date}`
    }
  }
  const fetchData = async (url) => {
    const resp = await fetch(url).catch(error => console.log(error.message));
    const data = await resp.json();
    setTickets(data.data);
    setdataLenght(data.results)
    if (!data) {
      setdataLenght(0)
      return
    }
    setLoading(false);
  };

  const fetchRoundFlight = async (url) => {
    const resp = await fetch(url).catch(error => console.log(error));
    const data = await resp.json();
    setTickets(data.data);
    setdataLenght(data.results)
    if (!data) {
      setdataLenght(0)
      return
    }
    setLoading(false);
  };

  const fetchMultiFlight = async (url) => {
    const resp = await fetch(url).catch(error => console.log(error));
    const data = await resp.json();
    setTickets(data.allFlights);
    setdataLenght(data.results)
    if (!data) {
      setdataLenght(0)
      return
    }
    setLoading(false);
  };


  useEffect(() => {
    if (type == "oneway") {
      fetchData(url)
    }
    else if (type == "RoundTrip") {
      fetchRoundFlight(url);
    } else if (type == "multiFlight") {
      fetchMultiFlight(url);
    }
  }, []);


  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "48%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }, []);

  const handleSheetChanges = useCallback((index) => {
    if (type == "oneway") {

      if (to == "Every Where") {
        url = `https://skyline-backend.cyclic.app/api/v1/flights?classes=${classes}&from=${from}&date=${date}&price[gte]=${Filtermin}&price[lte]=${Filtermax}&ratingsQuantity[gte]=${Rate}`
      } else {
        url = `https://skyline-backend.cyclic.app/api/v1/flights?classes=${classes}&from=${from}&to=${to}&date=${date}&price[gte]=${Filtermin}&price[lte]=${Filtermax}&ratingsQuantity[gte]=${Rate}`
      }
      fetchData(url);

    } else if (type == "RoundTrip") {
      if (to == "Every Where") {
        url = `https://skyline-backend.cyclic.app/api/v1/flights/round-trip?from=${from}&classes=${classes}&firstDate=${date}&lastDate=${date2}&price[gte]=${Filtermin}&price[lte]=${Filtermax}&ratingsQuantity[gte]=${Rate}`
      } else {
        url = `https://skyline-backend.cyclic.app/api/v1/flights/round-trip?from=${from}&to=${to}&classes=${classes}&firstDate=${date}&lastDate=${date2}&price[gte]=${Filtermin}&price[lte]=${Filtermax}&ratingsQuantity[gte]=${Rate}`
      }
      fetchRoundFlight(url);

    } else {

      if (to == "Every Where") {
        url = `https://skyline-backend.cyclic.app/api/v1/flights/multiDestinations?from=${from}&firstDate=${date}&price[gte]=${Filtermin}&price[lte]=${Filtermax}&ratingsQuantity[gte]=${Rate}`  ////problem there is no to field
      } else {
        url = `https://skyline-backend.cyclic.app/api/v1/flights/multiDestinations?from=${from}&to=${to}&firstDate=${date}&price[gte]=${Filtermin}&price[lte]=${Filtermax}&ratingsQuantity[gte]=${Rate}`
      }
      fetchMultiFlight(url);

    }
  }, [Filtermin, Filtermax]);


  const HandleOpenSheet = () => {
    handlePresentModalPress()
  }

  const FlatList_Header = () => {
    return (
      <AirplaneData navigation={navigation} Filter={true} title='Flight Search' HandleOpenSheet={HandleOpenSheet}
        from={from} to={to} dateDepurture={date} dateReturn={type == "RoundTrip" ? date2 : "---"}
      />
    );
  }

  if (dataLenght == 0 || Tickets.length == 0 && loading != true) {
    return (
      <ImageBackground
        source={bg}
        resizeMode='cover'
        style={{
          width: width,
          height: height + 50,
          backgroundColor: loading ? 'gray' : 'rgba(0,0,0,0.0)'
        }}
      >
        <StatusBar hidden={true} />

        <View style={{ marginTop: 20 }}>
          <AirplaneData navigation={navigation} Filter={true} title='Flight Search' HandleOpenSheet={HandleOpenSheet}
            from={from} to={to} dateDepurture={date} dateReturn={type == "RoundTrip" ? date2 : "---"}
          />
        </View>

        <Empty />

        {IsOpen && <BottomSheetModalProvider>
          <Animated.View >
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onDismiss={() => {
                setIsOpen(false)
                handleSheetChanges()
              }}>
              <BottomSheetTickets
                HandleFiltermin={HandleFiltermin}
                HandleFiltermax={HandleFiltermax}
                HandleFilterRate={HandleFilterRate}
                Rate={Rate}
              />
            </BottomSheetModal>
          </Animated.View>
        </BottomSheetModalProvider>}
      </ImageBackground>
    )
  }

  return (
    <SafeAreaView>
      <ImageBackground
        source={bg}
        resizeMode='cover'
        style={{
          width: width,
          height: height + 50,
          backgroundColor: loading ? 'gray' : 'rgba(0,0,0,0.0)'
        }}
      >

        {loading &&
          <View style={{
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(24,24,24,0.5)',
          }}>
            <Loading />
          </View>
        }

        <View style={{ marginTop: 20, marginBottom: 20 }}>


          <FlatList
            data={Tickets}
            renderItem={({ item }) =>
              <CardOfTicket
                navigation={navigation}
                item={item}
                type={type}
                Ticketslength={Tickets.length}
              />}
            // keyExtractor={item => item._id}
            ListHeaderComponent={FlatList_Header}
          />


        </View>

        <BottomSheetModalProvider>
          <Animated.View >
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onDismiss={() => {
                setIsOpen(false)
                handleSheetChanges()
              }}>
              <BottomSheetTickets
                HandleFiltermin={HandleFiltermin}
                HandleFiltermax={HandleFiltermax}
                HandleFilterRate={HandleFilterRate}
                Rate={Rate}
              />
            </BottomSheetModal>
          </Animated.View>
        </BottomSheetModalProvider>

      </ImageBackground>
    </SafeAreaView>
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