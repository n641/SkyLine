import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../../Api/axios';

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors';

import RateCard from '../../../Components/ComponentsofHotels/RateCard';
import CommetCard from '../../../Components/ComonentOfAirlines/CommetCard';
import CustomTF from '../../../Components/CustomeTextFields/CustomTF';
import MainButton from '../../../Components/MainButton';
import AddRate from '../../../Components/ComonentOfAirlines/AddRate';
import CustomeAnimated from '../../../Components/CustomeAlerts/CustomeAnimated';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function DetialsCompany({ navigation, route }) {
  const { Data } = route.params;
  const [Comments, setComments] = useState([])
  const [ShowPopUp, setShowPopUp] = useState(false)
  const [text, settext] = useState(null)
  const [Rate, setRate] = useState(Data.rate)
  const auth = useSelector(state => state.Auth.token);
  const [FlageError, setFlageError] = useState(false)

  const handletext = (val) => {
    settext(val)
  }
  const handleRate = (val) => {
    setRate(val)
  }
  console.log(Rate)
  const GetComments = async () => {
    const url = `https://skyline-backend.cyclic.app/api/v1/flights-comments?airplaneCompany=${Data.id}`
    const response = await axios.get(url,
      {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth}` },
        withCredentials: true
      }
    )
      .catch(error => { console.log(error) }
      )

    if (response) {
      setComments(response.data.comments)
    }
  }

  useEffect(() => {
    GetComments()
  }, []);

  const addComment = async (rate, comment) => {
    const url = `https://skyline-backend.cyclic.app/api/v1/flights-comments`
    const response = await axios.post(url, JSON.stringify({
      comment: comment,
      rate: rate,
      airplaneCompany: Data.id
    }),
      {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth}` },
        withCredentials: true
      }
    )
      .catch(error => { console.log(error) }
      )

    if (response) {
      console.log("done")
    }
  }


  const FlatList_Header = () => {
    return (
      <TouchableOpacity style={styles.card2}
        onPress={() => {
          setShowPopUp(true)
        }}
      >
        <Ionicons name="add-circle-outline" size={50} color="white" />
        <Text style={styles.text}>Add comment</Text>
      </TouchableOpacity>
    );
  }


  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1487553333251-6c8e26d3dc2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
      }}
      style={{ height: height, width: width }}
    >
      <View style={{ alignSelf: 'flex-start', position: 'absolute', top: 30 }}>

        <AntDesign name="arrowleft" size={30} color="white" onPress={() => {
          navigation.goBack()
        }}
          style={{ backgroundColor: 'rgba(24,24,24,0.7)', borderRadius: 8, marginHorizontal: 15, padding: 5 }}
        />
      </View>

      <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginTop: 50 }}>{Data.airplaneName}</Text>


      <View style={styles.card}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: Data.airplaneCompanyPhoto,
            }}
          />
          <Text style={[styles.Headtitle, { color: 'gray', fontSize: 15 }]}>{Data.description}</Text>
          <View style={{ margin: 10 }}>
            <RateCard rate={Data?.rate} />
          </View>
        </View>
      </View>

      <View style={{ height: height, justifyContent: 'flex-end', top: height / 2 }}>

        <Text style={[styles.Headtitle, { alignSelf: 'flex-start', marginLeft: 15, fontSize: 25 }]}>Comments</Text>
        <FlatList
          horizontal={true}
          data={Comments}
          renderItem={({ item }) =>
            <CommetCard
              navigation={navigation}
              item={item}
            />}
          keyExtractor={item => item._id}
          ListHeaderComponent={FlatList_Header}
        />

      </View>

      <CustomeAnimated visible={ShowPopUp} color={'black'}>
            <Text style={{ fontSize: 35, color: "white" }}
              onPress={() => {
                setShowPopUp(false)
              }}
            >x</Text>
            <Text style={[styles.text, { alignSelf: 'center', fontFamily: 'item', fontSize: 25, marginBottom: 10, color: FlageError == true ? "red" : "white" }]}>{FlageError == true ? "must Add comment" : "Add comment"}</Text>
            <CustomTF placeholder="add your comment" keyboardType="default" type="" label="Comment" width={(width - 200)} required={true} icon={false} onAddText={handletext} text={text} />
            <AddRate handleRate={handleRate} rate={Rate} />
            <View style={{ alignSelf: 'center', margin: 10 }}>
              <MainButton title={"ADD"} onClick={() => {
                if (text != null && Rate) {
                  setShowPopUp(false)
                  addComment(Rate, text)
                  GetComments()
                } else {
                  setFlageError(true)
                }

              }} />
            </View>
          </CustomeAnimated>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  tinyLogo:
  {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    margin: 10,
    borderRadius: 15
  }
  , card: {
    position: 'absolute',
    backgroundColor: 'rgba(24,24,24,0.7)',
    borderRadius: 8,
    padding: 10,
    top: height / 6,
    alignSelf: 'center'
  },
  Headtitle: {
    fontSize: 18,
    fontFamily: 'item',
    textAlign: 'center',
    color: 'white',
  },
  card2: {
    width: width - 100,
    backgroundColor: 'rgba(24,24,24,0.7)',
    margin: 10,
    borderRadius: 8,
    padding: 20,
    alignItems: 'flex-start',
    width: width - 110,
    height: height / 3.5,
    justifyContent: 'center',
    alignItems: 'center'
  }, text: {
    fontSize: 20,
    color: 'white'
  }
})