import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

import HotelOfferCard from './HotelOfferCard'
import { useState, useEffect } from 'react'

export default function HotelsOffers({ navigation }) {
    const [Hotels, setHotels] = useState([])

    const url = `https://skyline-backend.cyclic.app/api/v1/hotels`
    const fetchData = async () => {
        const resp = await fetch(url).catch(error => console.log(error.message));
        const data = await resp.json();
        setHotels(data.data)
        // console.log(data.data)
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <View style={{marginTop:0}}>
            <Text style={{color:'white' , marginLeft:15 , marginTop:10 , marginBottom:10 , fontSize:20 , fontFamily:'item'}}>Top Hotels</Text>
            <FlatList
                horizontal
                data={Hotels}
                renderItem={({ item }) => <HotelOfferCard item={item} navigation={navigation} />}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                bounces={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({})