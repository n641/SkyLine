import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../../../store/actions/auth';

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import UploadImg from '../../../assets/UploadImg.png'

import axios from '../../../Api/axios';

import Colors from '../../../Conestant/Colors';


import CustomTF from '../../../Components/CustomeTextFields/CustomTF';
import UploadImgTF from '../../../Components/CustomeTextFields/UploadImgTF';
import VerfiyIdTF from '../../../Components/CustomeTextFields/VerfiyIdTF';
import PhoneNumberTF from '../../../Components/CustomeTextFields/PhoneNumberTF';
import MainButton from '../../../Components/MainButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileScreen({ navigation }) {
  const auth = useSelector(state => state.Auth.token);
  const datauser = useSelector(state => state.Auth.userData);
  const [error, seterror] = useState(false)
  const [first, setfirst] = useState()
  const [selectedFrontId, setSelectedFrontId] = useState(null);
  const [selectedBackId, setSelectedBackId] = useState(null);

  const dispatch = useDispatch();
  const getuser = useCallback(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    getuser();
  }, [dispatch]);

  const HandleFirst = (t) => {
    setfirst(t);
  }

  const [Id, setId] = useState();
  const handlId = (text) => {
    setId(text)
  }

  const HandleFrontId = (img) => {
    setSelectedFrontId(img)
  }

  const HandleBackId = (img) => {
    setSelectedBackId(img)
  }

  useEffect(() => {
    if (!datauser?.phoneActive || !datauser?.emailActive || !datauser?.IDActive) {
      seterror(true)
    }
  }, [])

  const AddPhone = async (number) => {
    console.log(JSON.stringify({
      phone: `${number}`,
    }))
    const res = await axios.patch('https://skyline-backend.cyclic.app/api/v1/users/updateMe', JSON.stringify({
      phone: number,
    }),
      {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth}` },
        withCredentials: true

      }
    ).catch(err => {
      console.log(err);
    });

    if(res.status==200){
      navigation.navigate('ResetPasswordByGmail' , {type:"phone" , number:number})
    }
  }



  return (
    <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
      style={styles.linearGradient}>

      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between', height: windowHeight }}>

        {error && <View style={{
          position: 'absolute', backgroundColor: '#D16363',
          flexDirection: 'row', alignItems: 'center',
          justifyContent: 'space-evenly', borderRadius: 7,
          width: windowWidth - 150, top: windowHeight / 20
        }}>
          <MaterialIcons name="error" size={24} color="black" />
          <Text style={[styles.text, { color: 'black', marginLeft: -windowWidth / 80 }]}>please, complete data</Text>
        </View>}



        <View style={styles.Screen}>

          <TouchableOpacity style={{ width: windowWidth - 10, margin: 10, flexDirection: 'row' }}
            onPress={() => {
              navigation.goBack()
            }}
          >
            <AntDesign name="arrowleft" size={35} color="white" />
          </TouchableOpacity>

          <Text style={{ fontFamily: 'item', color: 'white', fontSize: 30, marginLeft: 15 }}>Edit Information</Text>


          <View style={{ justifyContent: 'center', margin: 5 }}>
            <Text style={[styles.text, { marginBottom: -10 }]}>username</Text>
            <View style={styles.containerConestInput}>
              <Text style={styles.text}>{datauser?.firstName} {datauser?.lastName}</Text>
            </View>
          </View>

          <View style={{ justifyContent: 'center' }}>
            <Text style={[styles.text, { marginBottom: -10 }]}>email</Text>
            <View style={styles.containerConestInput}>
              <Text style={styles.text}>{datauser?.email}</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center' }}>


            <PhoneNumberTF placeholder={datauser?.phone ? datauser?.phone : "*********"} keyboardType='numeric' label='phone Number' required={true} onAddText={HandleFirst} text={first} />
            <TouchableOpacity style={{ position: 'absolute', left: windowWidth / 1.65, top: windowHeight/26 }}
              onPress={() => {
                if (first != null) {
                  AddPhone(first)
                } else {
                  console.log("phone")
                }
              }}
            >
              <Text style={{ color: "white", fontSize: 18, backgroundColor: datauser?.phoneActive == true ? 'green' : 'red', borderRadius: 10, padding: 5 }}>{datauser?.phoneActive} Active</Text>
            </TouchableOpacity>
          </View>

          <View style={{ margin: 40, alignItems: 'center', justifyContent: 'center', width: windowWidth }}>
            <VerfiyIdTF text={Id} HandleText={handlId} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

            <View>
              <UploadImgTF required={true} label="Upload Front ID" placeholder={datauser?.frontIDPhoto ? datauser?.frontIDPhoto : UploadImg} selectedImage={selectedFrontId} setSelectedImage={HandleFrontId} id={"front"} />
            </View>

            <View>
              <UploadImgTF required={true} label="Upload back ID" placeholder={datauser?.frontBackPhoto ? datauser?.frontBackPhoto : UploadImg} selectedImage={selectedBackId} setSelectedImage={HandleBackId} id={"back"} />
            </View>

          </View>

        </View>

        <MainButton title={'Save'} onClick={() => { }} />

      </ScrollView>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  Screen: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-around'
  },
  containerConestInput: {
    borderColor: '#545151',
    borderWidth: 1,
    width: windowWidth - 70,
    marginVertical: 15,
    padding: 8,
    backgroundColor: '#545151',
    borderRadius: 8

  },
  text: {
    fontFamily: 'item',
    fontSize: 18,
    color: 'white'
  }
})