import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { getMe } from '../../../store/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

import LoadingImg from '../../../Components/AnimatedImg/Loading'
import Empty from '../../../Components/AnimatedImg/Empty'

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
  const [loading, setloading] = useState(true)



  const fetchData = async () => {
    // console.log(datauser)
    const resp = await fetch(`https://skyline-backend.cyclic.app/api/v1/tickets?user=${datauser._id}&type=round-trip&type=one-way&type=multi-destination`);
    const data = await resp.json();
    setTickets(data.data)
    setloading(false)
  };

  if (loading) {
    return (
      <LoadingImg />
    )
  }

  if (!loading && Tickets.length == 0) {
    return (
      <Empty />
    )
  }

  return (
    <View style={{ height: height - 55 }}>
      <StatusBar hidden={true} />
      <TicketCardHistory
        Tickets={Tickets}
        navigation={navigation}
        loading={loading}
      />
      {/* {!loading && Tickets.length == 0 &&
      <Empty />
      } */}

    </View>
  )
}

const styles = StyleSheet.create({})