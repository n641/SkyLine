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
    }, [dispatch]);

    


    return (
        <View style={{ height: height - 55  }}>
            <CarcHistoryHotel
                navigation={navigation}
            />
        </View>
    )
}

const styles = StyleSheet.create({})