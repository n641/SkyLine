import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  FlatList,
  Text,
  Animated,
  ActivityIndicator
} from "react-native";

import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";
import CAlert from "../../../Components/CustomeAlerts/CAlert";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import bg from '../../../assets/bg-dark.jpg';

import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import CardOfTicket from "../../../Components/ComponentsOfTicket/CardOfTicket";

import wrong from '../../../assets/warning.png'



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function ResultTicketsScreen({ navigation, route }) {

  const { from, to, classes, date } = route.params;
  // console.log(from)
  // console.log(to)
  // console.log(date)
  // console.log(classes)
  const [visibleForm, setvisibleForm] = useState(false)
  const [titleForm, settitleForm] = useState("There are no planes at that time for that country")

  const [loading, setLoading] = useState(true);
  const [Tickets, setTickets] = useState([])

  // //////////////////////////////////fetch data//////////////////////////////////////////////

  const fetchData = async () => {
    const resp = await fetch(`https://skyline-backend.cyclic.app/api/v1/flights?classes=${classes}&from=${from}&to=${to}&date=${date}`);
    const data = await resp.json();
    setTickets(data.data);

    if (data.data.length == 0) {
      setvisibleForm(true)
    }

    // console.log("data length")
    // console.log(data.data.length)

    if (data.data.length != 0) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////

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

  const HandleNavigate = (name) => {
    navigation.navigate(name)
  }


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

      <View style={{ marginTop: 20, marginBottom: 290 }}>

        <AirplaneData navigation={navigation} Filter={true} title='Flight Search' HandleOpenSheet={HandleOpenSheet} />

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
              id={item.id}
              seats={item.Seats}
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