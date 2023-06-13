import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import React, { useState ,useEffect } from 'react'

import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../../Conestant/Colors';

import CardOfAirline from '../../../Components/ComonentOfAirlines/CardOfAirline';
import { AntDesign } from '@expo/vector-icons';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function ListCompanies({ navigation }) {
    const [Airlines, setAirlines] = useState([])


    const fetchMultiFlight = async () => {
        const url = `https://skyline-backend.cyclic.app/api/v1/airplaneCompany`
        const resp = await fetch(url).catch(error => console.log(error));
        const data = await resp.json();
        setAirlines(data.data);
      };
    
    
      useEffect(() => {
        fetchMultiFlight()
      }, []);
    const FlatList_Header = () => {
        return (
            <View style={{flexDirection:'row' , justifyContent:'flex-start'}}>
                 <AntDesign name="arrowleft" size={30} color="white" onPress={() => {
                        navigation.goBack()
                    }} />
                <Text style={[styles.Headtitle ,{marginLeft:width/8}]}>Airlines Company</Text>
            </View>
        );
    }
    return (
        <LinearGradient colors={[Colors.first_dark_screen, Colors.second_dark_screen, Colors.third_dark_screen]}
            style={styles.container}>
            <View style={{marginVertical:30 , marginHorizontal:20  }}>
                <FlatList
                    data={Airlines}
                    renderItem={({ item }) =>
                        <CardOfAirline
                            navigation={navigation}
                            item={item}
                        />}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={FlatList_Header}
                />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'flex-start',
    },
    Headtitle: {
        fontSize: 25,
        fontFamily: 'item',
        textAlign: 'center',
        color: 'white'

    }
})