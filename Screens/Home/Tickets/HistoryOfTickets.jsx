import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { getMe } from '../../../store/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import TicketCardHistory from '../../../Components/SubScreensOfTicket/TicketCardHistory';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function HistoryOfTickets({ navigation }) {
  const dispatch = useDispatch();
  const getuser = useCallback(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    getuser();
    fetchData();
  }, [dispatch]);

  const datauser = useSelector(state => state.Auth.userData);
  const [Tickets, setTickets] = useState([])



  const fetchData = async () => {
    // console.log(datauser)
    const resp = await fetch(`https://skyline-backend.cyclic.app/api/v1/tickets?user=${datauser._id}&type=round-trip&type=one-way&type=multi-destination`);
    const data = await resp.json();
    setTickets(data.data)

  };

  // useEffect(() => {
  //   // fetchData();
  // }, []);

  return (
    <View style={{ height: height - 55 }}>
      <StatusBar hidden={true} />
      <TicketCardHistory
        Tickets={Tickets}
        navigation={navigation}
      />
    </View>
  )
}

const styles = StyleSheet.create({})