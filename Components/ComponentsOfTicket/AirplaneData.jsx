import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import React from 'react'

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Airplane from '../../assets/Airplane.png';



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function AirplaneData({ navigation, Filter , HandleOpenSheet , title }) {
    return (
        <View>

            <View style={{ flexDirection: 'row', justifyContent: Filter? 'space-between' : 'flex-start', marginHorizontal: 20 , marginTop:10 }}>

                <View >
                    <AntDesign name="arrowleft" size={30} color="white" onPress={() => {
                        navigation.goBack()
                    }} />
                </View>



                <View style={{
                    alignItems: 'center',
                    marginTop: 40,
                    marginStart:Filter?0:70
                }}>

                    <Text style={styles.title}>{title}</Text>

                </View>

                {Filter&&<Ionicons name="filter-sharp" size={24} color="white" onPress={()=>{
                    HandleOpenSheet()
                }} />}

            </View>

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    // marginTop: -30
                }}
            >
                <Image
                    source={Airplane}
                    resizeMode='contain'
                    style={{
                        width: width / 1.3,
                        height: (height / 10) + 50,
                    }}
                />

            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginTop: -20 }}>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.text}>Tokyo</Text>
                    <Text style={styles.text}>01 January 2023</Text>
                    <Text style={styles.text}>1 Adults</Text>
                    <Text style={styles.text}>1 Adults</Text>
                </View>

                <View>
                    <Text style={styles.text}>Tokyo</Text>
                    <Text style={styles.text}>01 January 2023</Text>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: 'item'
    },
    title: {
        fontFamily: 'item',
        color: "white",
        fontSize: 30,
    },

})