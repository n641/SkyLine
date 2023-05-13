import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState , useCallback} from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../../../store/actions/auth';

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../../../Conestant/Colors';

import CustomTF from '../../../Components/CustomeTextFields/CustomTF';
import UploadImgTF from '../../../Components/CustomeTextFields/UploadImgTF';
import VerfiyIdTF from '../../../Components/CustomeTextFields/VerfiyIdTF';
import PhoneNumberTF from '../../../Components/CustomeTextFields/PhoneNumberTF';
import MainButton from '../../../Components/MainButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ProfileScreen({ navigation }) {
  const datauser = useSelector(state => state.Auth.userData);
  const dispatch = useDispatch();
    const getuser = useCallback(() => {
        dispatch(getMe())
    }, [dispatch])
    
    useEffect(() => {
        getuser();
    }, []);
  // console.log("data in screen "+ datauser?.email)
  const [error, seterror] = useState(false)
  const [first, setfirst] = useState()

  const HandleFirst = (t) => {
    setfirst(t);
  }

  const [Id, setId] = useState();
  const handlId = (text) => {
    setId(text)
  }
  const [selectedFrontId, setSelectedFrontId] = useState(null);
  const [selectedBackId, setSelectedBackId] = useState(null);
  

  const HandleFrontId = (img) => {
    setSelectedFrontId(img)
  }

  const HandleBackId = (img) => {
    setSelectedBackId(img)
  }
  console.log("datauser.emailVerificationToken")
  console.log(datauser.phoneActive)
  useEffect(() => {
    if (!datauser?.phoneActive || !datauser?.emailActive || !datauser?.IDActive) {
      seterror(true)
    }
  }, [])

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


          <View style={{ margin: 0 }}>
            <PhoneNumberTF placeholder={datauser?.phoneActive ? datauser?.phone : "*********"} keyboardType='numeric' label='phone Number' required={true} onAddText={HandleFirst} text={first} />
          </View>

          <View style={{ margin: 40, alignItems: 'center', justifyContent: 'center', width: windowWidth }}>
            <VerfiyIdTF text={Id} HandleText={handlId} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

            <View>
              <UploadImgTF required={true} label="Upload Front ID" selectedImage={selectedFrontId} setSelectedImage={HandleFrontId} />
            </View>

            <View>
              <UploadImgTF required={true} label="Upload back ID" selectedImage={selectedBackId} setSelectedImage={HandleBackId} />
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