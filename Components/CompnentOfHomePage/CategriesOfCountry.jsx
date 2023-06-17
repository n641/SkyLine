import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'

import OfferCard from './OfferCard'

export default function CategriesOfCountry({navigation}) {
    const [DATA, setDATA] = useState([
        {
            title: "2023 Discound",
            descreption: 'on business class Tickets',
            id:1,
            imag:'https://images.unsplash.com/photo-1524592714635-d77511a4834d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
        },
        {
            title: "2023 Discound",
            descreption: 'on Hotels Five Stars',
            id:2,
            imag:'https://images.unsplash.com/photo-1590073844006-33379778ae09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'

        }
    ])
    return (
        <View>
            <Text style={{color:'white' , marginLeft:15 , marginTop:30 , fontSize:25 ,  fontFamily:'item'}}>Offers</Text>
            <FlatList
                horizontal
                data={DATA}
                renderItem={({ item }) => <OfferCard item={item} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({})