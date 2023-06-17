import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

import { useState, useEffect, useCallback } from 'react';
import { getMe } from '../../../store/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import CarcHistoryHotel from '../../../Components/ComponentsofHotels/CarcHistoryHotel';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function HistoryOfHotel({ navigation }) {
    const dispatch = useDispatch();
    const getuser = useCallback(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getuser();
        // fetchData()
    }, [dispatch]);

    const fetchData = async () => {
        const resp = await fetch(`https://skyline-backend.cyclic.app/api/v1/tickets?user=${datauser._id}&type=round-trip&type=one-way&type=multi-destination`);
        const data = await resp.json();
        // setTickets(data.data)

    };

    const datauser = useSelector(state => state.Auth.userData);
    const [Hotels, setHotels] = useState([
        {
            img: 'https://res.cloudinary.com/skyline-photos/image/upload/v1684353911/hotels/IceWare/IceWare-333052-photo.jpg'
            , date: "25-5-2023",
            price: 809,
            rooms: [{ name: "superior room", }, { name: "superior room", }],
            payment: true,
            name: 'IceLand',
            rate:5
        },
        {
            img: 'https://res.cloudinary.com/skyline-photos/image/upload/v1684353911/hotels/IceWare/IceWare-333052-photo.jpg'
            , date: "25-5-2023",
            price: 809,
            rooms: [{ name: "superior room", }, { name: "superior room", }],
            payment: true,
            name: 'IceLand'
            ,rate:5
        
        },
        {
            img: 'https://res.cloudinary.com/skyline-photos/image/upload/v1684353911/hotels/IceWare/IceWare-333052-photo.jpg'
            , date: "25-5-2023",
            price: 809,
            rooms: [{ name: "superior room", }, { name: "superior room", }],
            payment: false,
            name: 'IceLand'
            ,rate:5

        }
    ])
    return (
        <View style={{ height: height - 55 }}>
            <CarcHistoryHotel
                Hotels={Hotels}
                navigation={navigation}
            />
        </View>
    )
}

const styles = StyleSheet.create({})