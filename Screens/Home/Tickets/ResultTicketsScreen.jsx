import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  Text,
  Animated,
  ActivityIndicator,
  SafeAreaView
} from "react-native";

import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { BottomSheetModal, BottomSheetModalProvider, } from "@gorhom/bottom-sheet";

import CAlert from "../../../Components/CustomeAlerts/CAlert";
import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import CardOfTicket from "../../../Components/ComponentsOfTicket/CardOfTicket";
import InputRange from "../../../Components/InputRange";

import bg from '../../../assets/bg-dark.jpg';
import wrong from '../../../assets/warning.png';



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function ResultTicketsScreen({ navigation, route }) {

  const { from, to, classes, date } = route.params;
  const [visibleForm, setvisibleForm] = useState(false)
  const [titleForm, settitleForm] = useState("There are no planes at that time for that country")

  const [loading, setLoading] = useState(true);
  const [Tickets, setTickets] = useState([])

  const [IsOpen, setIsOpen] = useState(false)

  const [Filtermin, setFiltermin] = useState(0);
  const [Filtermax, setFiltermax] = useState(1000);
  const [dataLenght, setdataLenght] = useState()

  const HandleFiltermin = (number) => {
    setFiltermin(number)
  }

  const HandleFiltermax = (number) => {
    setFiltermax(number)
  }

  var url = "";
  if (to == "Every Thing") {
    url = `https://skyline-backend.cyclic.app/api/v1/flights?classes=${classes}&from=${from}&date=${date}`
  } else {
    url = `https://skyline-backend.cyclic.app/api/v1/flights?classes=${classes}&from=${from}&to=${to}&date=${date}`
  }
  const fetchData = async (url) => {
    const resp = await fetch(url).catch(error => console.log(error.message));
    const data = await resp.json();
    setTickets(data.data);
    // console.log(data)
    setdataLenght(data.results)

    if (!data) {
      setdataLenght(0)
      return
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(url);
  }, []);


  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "48%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }, []);

  const handleSheetChanges = useCallback((index) => {

    if (to == "Every Thing") {
      url = `https://skyline-backend.cyclic.app/api/v1/flights?classes=${classes}&from=${from}&date=${date}&price[gte]=${Filtermin}&price[lte]=${Filtermax}`
    } else {
      url = `https://skyline-backend.cyclic.app/api/v1/flights?classes=${classes}&from=${from}&to=${to}&date=${date}&price[gte]=${Filtermin}&price[lte]=${Filtermax}`
    }
    // console.log(url)
    fetchData(url);

  }, [Filtermin, Filtermax]);

  const HandleOpenSheet = () => {
    handlePresentModalPress()
  }

  const FlatList_Header = () => {
    return (
      <AirplaneData navigation={navigation} Filter={true} title='Flight Search' HandleOpenSheet={HandleOpenSheet} />
    );
  }

  if (dataLenght == 0) {
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
        <View style={{ marginTop: 20 }}>

          <AirplaneData navigation={navigation} Filter={true} title='Flight Search' HandleOpenSheet={HandleOpenSheet} />

        </View>

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

              <View>
                <InputRange min={0} max={1000} steps={5} title='nono' onValueChange={(range) => {
                  setFiltermin(range.min)
                  setFiltermax(range.max)
                }}
                  HandleFiltermin={HandleFiltermin}
                  HandleFiltermax={HandleFiltermax}

                />
              </View>

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
            justifyContent: 'center'
          }}>
            <ActivityIndicator size="large" color={'#00ff00'} />
          </View>
        }

        <CAlert visible={visibleForm} icon={wrong} title={titleForm} onClick={() => {
          setvisibleForm(false)
          navigation.goBack()
        }} />

        <View style={{ marginTop: 20, marginBottom: 20 }}>

          <FlatList
            data={Tickets}
            renderItem={({ item }) =>
              <CardOfTicket
                image={"https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png"}
                flightNum={item.flightNo}
                From={item.from}
                TO={item.to}
                DateFrom={item.fromDate}
                DateTo={item.toDate}
                duration={"6h 0m"}
                date={item.date.substring(0, 9)}
                gate={item.gate}
                sala={"5"}
                classs={item.classes}
                bag={item.maxBagPerPerson}
                price={item.price}
                navigation={navigation}
                id={item._id}
                seats={item.Seats}
              />}
            keyExtractor={item => item._id}
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

              <View>
                <InputRange min={0} max={1000} steps={5} title='nono' onValueChange={(range) => {
                  setFiltermax(range.max)
                  setFiltermin(range.min)
                }}
                  HandleFiltermin={HandleFiltermin}
                  HandleFiltermax={HandleFiltermax}

                />
              </View>

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