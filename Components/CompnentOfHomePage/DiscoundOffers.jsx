import { StyleSheet, Text, View, FlatList } from 'react-native'
import React ,{useState} from 'react'

import CardDiscoundOffers from './CardDiscoundOffers'

export default function DiscoundOffers({navigation}) {
    const [DATA, setDATA] = useState([
        {
            title: "12% Discound",
            descreption: 'on Hotel & Resort \n booking for banks \n AMEX 2000',
            id: 1,
            imag: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
        },
        {
            title: "2023 Discound",
            descreption: 'on tickets  \n booking for banks \n AMEX 2000',
            id: 2,
            imag: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'

        }
    ])
    return (
        <View>
            {/* <Text style={{ color: 'white', marginLeft: 15, marginTop: 25, fontSize: 20 }}></Text> */}
            <FlatList
                data={DATA}
                renderItem={({ item }) => <CardDiscoundOffers item={item} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({})