import {
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    ScrollView,
    Image, Text
} from 'react-native'
import React from 'react'

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import bg from '../../../assets/bg-dark.jpg';
import airplane from '../../../assets/airplane2.png'

import AirplaneData from "../../../Components/ComponentsOfTicket/AirplaneData";
import MainButton from '../../../Components/MainButton'

import QR from '../../../assets/QRcode.png'




const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function FinalBookTicket({ navigation }) {
    return (
        <ImageBackground
            source={bg}
            resizeMode='cover'
            style={{
                width: width,
                height: height + 50,
            }}
        >
            <ScrollView >

                <View >
                    <AirplaneData navigation={navigation} title='Ticket Detail' />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>

                    <View style={{
                        backgroundColor: 'rgba(24,24,24,0.8)',
                        borderRadius: 20,
                        width: width - 80,
                        height: height / 1.5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Image
                            source={{
                                uri: 'https://logodownload.org/wp-content/uploads/2020/03/egyptair-logo-1.png',
                            }}
                            style={{ width: width, height: height / 8.5, resizeMode: 'contain' }}
                        />

                        {/* //row1     */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <View>
                                <Text style={[styles.text, { color: 'gray', marginVertical: 3 }]}>BOM</Text>
                                <Text style={[styles.text, { color: 'white', marginVertical: 3 }]}>Tokyo</Text>
                            </View>

                            <View>
                                <Image
                                    source={airplane}
                                    resizeMode='contain'
                                    style={{
                                        width: width / 3.3,
                                        height: (height / 11) + 50,
                                        margin: 10
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.text, { color: 'gray', marginVertical: 3 }]}>DXp</Text>
                                <Text style={[styles.text, { color: 'white', marginVertical: 3 }]}>Tokyo</Text>
                            </View>

                        </View>

                        {/* //row2     */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: width / 1.4 }}>

                            <View style={{
                                backgroundColor: '#4F4C4C',
                                borderRadius: 10,
                                alignItems: 'center',
                                paddingHorizontal: 25,
                                paddingVertical: 4
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 6 }}>
                                    <AntDesign name="clockcircleo" size={15} color="white" style={{ marginHorizontal: 4 }} />
                                    <Text style={styles.Dtext}>Time</Text>
                                </View>
                                <Text style={styles.Dtext}>16:15
                                    <Text> PM</Text>
                                </Text>
                            </View>


                            <View style={{
                                backgroundColor: '#4F4C4C',
                                borderRadius: 10,
                                alignItems: 'center',
                                paddingHorizontal: 10,
                                paddingVertical: 4
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 6 }}>
                                    <MaterialIcons name="date-range" size={17} color="white" style={{ marginHorizontal: 4 }} />
                                    {/* <MaterialIcons name="date-range" size={24} color="black" /> */}
                                    <Text style={styles.Dtext}>Date</Text>
                                </View>
                                <Text style={[styles.Dtext, { fontSize: 15 }]}>01 january 2023
                                </Text>
                            </View>


                        </View>



                        {/* //row3     */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 30, width: width / 1.2 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.Dtext}>Gate</Text>
                                <Text style={[styles.text, { color: 'gray' }]}>{"5"}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.Dtext}>Seat</Text>
                                <Text style={[styles.text, { color: 'gray' }]}>--</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.Dtext}>Class</Text>
                                <Text style={[styles.text, { color: 'gray' }]}>{"economy"}</Text>
                            </View>

                        </View>


                        {/* //row4     */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.Dtext}>Flight Num :
                                <Text style={[styles.text, { color: 'gray' }]}> {"EY5847"}</Text>
                            </Text>


                        </View>


                    </View>

                    <View style={{
                        borderWidth: 1,
                        borderColor: 'white',
                        margin: -1,
                        width: width - 130,
                    }} />

                    <View style={{
                        backgroundColor: 'rgba(24,24,24,0.8)',
                        borderRadius: 15,
                        width: width - 80,
                        height: height / 4,
                        alignItems:'center',
                        justifyContent:'center'

                    }}>

                        <Image
                            source={QR}
                            style={{ width: width/3, height: height / 5.3, resizeMode: 'stretch' }}
                        />

                    </View>

                    <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-evenly', width: width }}>

                        <MainButton title='Download' onClick={() => { }} />
                        <MainButton title='Done' onClick={() => { }} />

                    </View>

                </View>

            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'item',
        fontSize: 20,
    },
    Dtext: {
        fontFamily: 'item',
        fontSize: 18,
        color: 'white',
    }
})