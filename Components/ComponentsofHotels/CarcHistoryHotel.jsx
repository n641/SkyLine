import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import LoadingImg from '../AnimatedImg/Loading'
import Empty from '../AnimatedImg/Empty'
import React, { useState, useEffect } from 'react'
import CardHistoryHotelStyle from './CardHistoryHotelStyle';

import { useSelector, useDispatch } from 'react-redux';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function CarcHistoryHotel({ navigation }) {
    const datauser = useSelector(state => state.Auth.userData);

    const [Hotels, setHotels] = useState([])
    const [loading, setloading] = useState(true)
    const fetchData = async () => {
        const resp = await fetch(`https://skyline-backend.cyclic.app/api/v1/tickets?type=hotel&user=${datauser._id}`)
        const data = await resp.json();
        setHotels(data.data)
        setloading(false)
    };

    useEffect(() => {
        fetchData()
    }, []);

    const FlatList_Header = () => {
        return (
            <View >
                <Text style={styles.header}>Booked Hotels</Text>
            </View>
        );
    }

    if (loading) {
        return (
            <LoadingImg />
        )
    }

    if (!loading && Hotels.length == 0) {
        return (
            <Empty />
        )
    }
    return (
        <View>
            <FlatList
                data={Hotels}
                renderItem={({ item, index }) =>
                    <CardHistoryHotelStyle
                        navigation={navigation}
                        item={item}
                        index={index}
                    />
                }
                // keyExtractor={item => item._id}
                ListHeaderComponent={FlatList_Header}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontFamily: 'item'
    },
})