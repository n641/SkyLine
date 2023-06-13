import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import RateCard from '../ComponentsofHotels/RateCard';
import ImageViewer from '../ImageViewer';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function CommetCard({ navigation, item }) {
    const [User, setUser] = useState([])


    const getUser = async () => {
        const url = `https://skyline-backend.cyclic.app/api/v1/users/${item.id}`
        const resp = await fetch(url).catch(error => console.log(error));
        const data = await resp.json();
        // console.log(data.data.data)
        setUser(data.data.data);
    };


    useEffect(() => {
        getUser()
    }, []);
    return (
        <View style={styles.card}>
            <RateCard rate={item.rate} />
            <Text style={styles.date}>{item.date}</Text>
            <Text style={[styles.date, { color: 'white' }]}>{item.comment}</Text>
            <View style={{flexDirection:'row' , alignItems:'center'}}>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: User?.userPhoto,
                }}
            />
            <Text style={[styles.date, { color: 'white' }]}>{User.username}</Text>
                
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: width - 100,
        // height: height / 5,
        backgroundColor: 'rgba(24,24,24,0.7)',
        margin: 10,
        borderRadius: 8,
        padding: 20,
        alignItems: 'flex-start'
    }, date: {
        fontFamily: 'item',
        fontSize: 18,
        color: 'gray',
        margin: 5
    }, tinyLogo:
    {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 10,
        borderRadius:15 ,
        marginVertical:5   
    }
})
