import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, Switch, ImageBackground } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getMe, changeTheme } from '../../../store/actions/auth';
import axios from '../../../Api/axios';

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ImageViewer from '../../../Components/ImageViewer'
import * as ImagePicker from 'expo-image-picker';

import Colors from '../../../Conestant/Colors';

import img from '../../../assets/desgineProfile.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const languages = [{ status: 'EN', Key: 1 }, { status: 'AR', Key: 2 },]
const themes = [{ status: 'Light', Key: 1 }, { status: 'Dark', Key: 2 },]

export default function MainProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.Auth.token);
  const theme = useSelector(state => state.Auth.theme);
  // console.log(theme)

  const getuser = useCallback(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    getuser();
  }, []);

  const changetheme2 = useCallback((theme) => {
    // console.log("token in function")
    // console.log(token)
    dispatch(changeTheme(theme))
  }, [dispatch])

  const datauser = useSelector(state => state.Auth.userData);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [error, seterror] = useState(false)
  const [SelectedImage, setSelectedImage] = useState(null)
  const [langActive, setlangActive] = useState('EN')
  const [themeActive, setthemeActive] = useState('Light')

  useEffect(() => {
    if (!datauser?.phoneActive || !datauser?.emailActive || !datauser?.IDActive) {
      seterror(true)
    }
  }, [])

  const uploadPhoto = async (result) => {

    let localUri = result.assets[0].uri;
    let formData = new FormData();
    formData.append('image', {
      uri: localUri,
      name: 'userProfile.jpg',
      type: 'image/jpg'
    });

    const res = await axios.patch('https://skyline-backend.cyclic.app/api/v1/users/uploadMyPhoto', formData,
      {
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${auth}` },
        withCredentials: true

      }
    ).catch(err => {
      console.log(err);
    });
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      uploadPhoto(result)
      //upload photo
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
      style={styles.linearGradient}>

      <View style={styles.Screen}>
        <TouchableOpacity style={{ width: windowWidth - 10, margin: 10, flexDirection: 'row' }}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <AntDesign name="arrowleft" size={35} color="white" />
          <Text style={{ fontFamily: 'item', color: 'white', fontSize: 30, marginLeft: windowWidth / 3.4 }}>Profile</Text>

        </TouchableOpacity>


        <TouchableOpacity onPress={() => { pickImageAsync() }}>
          <ImageViewer placeholderImageSource={datauser?.userPhoto ? datauser?.userPhoto : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'}
            selectedImage={SelectedImage} HideEditicon={true} local={true} />
        </TouchableOpacity>


        <Text style={styles.name}>{datauser?.firstName} {datauser?.lastName}</Text>

        <Image
          style={styles.Logo}
          source={img}
        />

        <ScrollView>

          <View style={{ width: windowWidth - 60, padding: 10, backgroundColor: 'black', borderRadius: 15, margin: 10 }}>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginHorizontal: 10 }}
              onPress={() => {
                navigation.navigate("ProfileScreen")
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {error ?
                  <MaterialIcons name="error" size={24} color="red" /> :
                  <Ionicons name="notifications" size={24} color="white" />
                }
                <Text style={styles.text}>Edit Profile information</Text>

              </View>

              <AntDesign name="arrowright" size={28} color="white" />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="notifications" size={24} color="white" />
                <Text style={styles.text}>Notifications</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Entypo name="language" size={24} color="white" />
                <Text style={styles.text}>Languages</Text>
              </View>

              {/* //////////TAB FOR LANGUAGES////////// */}
              <View style={styles.listTab}>
                {
                  languages.map((e, i) => {
                    return (
                      <TouchableOpacity
                        key={e.Key}
                        style={[styles.btn, langActive === e.status && styles.btnTabActive]}
                        onPress={() => { setlangActive(e.status) }}
                      >
                        <Text style={styles.textbtn}>{e.status}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
              {/* /////////////////// */}

            </View>

          </View>

          {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
          <View style={{ width: windowWidth - 60, padding: 10, backgroundColor: 'black', borderRadius: 15, margin: 10 }}>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="security" size={24} color="white" />
                <Text style={styles.text}>Security</Text>
              </View>
              <AntDesign name="arrowright" size={35} color="white" />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="theme-light-dark" size={24} color="white" />
                <Text style={styles.text}>Themes</Text>
              </View>

              {/* //////////TAB FOR tabTheme////////// */}
              <View style={styles.listTab}>
                {
                  themes.map((e, i) => {
                    return (
                      <TouchableOpacity
                        key={e.Key}
                        style={[styles.btn, themeActive === e.status && styles.btnTabActive]}
                        onPress={() => {
                          setthemeActive(e.status)
                          // setmodeTheme(e.status=="Light"?true:false)
                          changetheme2(e.status == "Light" ? true : false)
                        }}
                      >
                        <Text style={styles.textbtn}>{e.status}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
              {/* /////////////////// */}

            </View>

          </View>
          {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}


          <View style={{ width: windowWidth - 60, padding: 10, backgroundColor: 'black', borderRadius: 15, margin: 10 }}>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Entypo name="help-with-circle" size={24} color="white" />
                <Text style={styles.text}>Help&Support</Text>
              </View>
              <AntDesign name="arrowright" size={35} color="white" />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="contact-phone" size={24} color="white" />
                <Text style={styles.text}>Contact Us</Text>
              </View>
              <MaterialIcons name="contact-phone" size={24} color="white" />
            </View>

          </View>
          {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}


        </ScrollView>


      </View>



    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  tinyLogo: {
    width: 90,
    height: 90,
    borderRadius: 50,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: 'item',
    color: 'white',
    fontSize: 25,
  },
  Logo: {
    width: windowWidth,
    // height: windowHeight,
    marginTop: -60,
    marginBottom: 20
  },
  container: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 4,
    borderRadius: 10,
    width: windowWidth / 1.5,
  },
  text: {
    fontFamily: 'item',
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  listTab: {
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btn: {
    width: 50,
    flexDirection: 'row',
    borderColor: '#EBEBEB',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textbtn: {
    fontSize: 16,
    fontFamily: 'item'
  },
  btnTabActive: {
    backgroundColor: '#00A7CC',
    borderRadius: 15,
  }
})