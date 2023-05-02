import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import { useState } from 'react';

import TicketCardHistory from '../../../Components/SubScreensOfTicket/TicketCardHistory';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function HistoryOfTickets() {

  const [Tickets, setTickets] = useState([
    {
      _id: "642736edea3cb1054a7765e",
      flightNo: "SZ195",
      Seats: "A2",
      classes: "Business",
      from: "Cairo",
      to: "Istanbul",
      fromDate: "08:00",
      toDate: "19:30",
      date: "2023-03-31T00:00:00.000Z",
      gate: "B5",
      maxBagPerPerson: 5,
      price: 150,
      ratingsQuantity: 0,
      airplaneCompany: "641f60ea8578a5e0592767d5",
      payment: 'success'
    },
    {
      _id: "642736edea3cbc105a7765e",
      flightNo: "SZ195",
      Seats: "A2",
      classes: "Business",
      from: "Cairo",
      to: "Istanbul",
      fromDate: "08:00",
      toDate: "19:30",
      date: "2023-03-31T00:00:00.000Z",
      gate: "B5",
      maxBagPerPerson: 5,
      price: 150,
      ratingsQuantity: 0,
      airplaneCompany: "641f60ea8578a5e0592767d5",
      payment: 'fail'

    },
    {
      _id: "642736eda3cbc1054a7765e",
      flightNo: "SZ195",
      Seats: "A2",
      classes: "Business",
      from: "Cairo",
      to: "Istanbul",
      fromDate: "08:00",
      toDate: "19:30",
      date: "2023-03-31T00:00:00.000Z",
      gate: "B5",
      maxBagPerPerson: 5,
      price: 150,
      ratingsQuantity: 0,
      airplaneCompany: "641f60ea8578a5e0592767d5",
      payment: 'success'

    },
    {
      _id: "62736edea3cbc1054a7765e",
      flightNo: "SZ195",
      Seats: "A2",
      classes: "Business",
      from: "Cairo",
      to: "Istanbul",
      fromDate: "08:00",
      toDate: "19:30",
      date: "2023-03-31T00:00:00.000Z",
      gate: "B5",
      maxBagPerPerson: 5,
      price: 150,
      ratingsQuantity: 0,
      airplaneCompany: "641f60ea8578a5e05927675",
      payment: 'fail'

    },
    {
      _id: "62736edea3cbc1054a7765",
      flightNo: "SZ195",
      Seats: "A2",
      classes: "Business",
      from: "Cairo",
      to: "Istanbul",
      fromDate: "08:00",
      toDate: "19:30",
      date: "2023-03-31T00:00:00.000Z",
      gate: "B5",
      maxBagPerPerson: 5,
      price: 150,
      ratingsQuantity: 0,
      airplaneCompany: "641f60ea857a5e059276d",
      payment: 'fail'

    },
  ])
  const [Loading, setLoading] = useState(false);

  // const fetchData = async () => {
  //   const resp = await fetch(`https://skyline-backend.cyclic.app/api/v1/flights/${id}`);
  //   const data = await resp.json();
  //   if (data.data.length != 0) {
  //     setLoading(false);
  //   }

  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <View style={{ height: height - 55 }}>
      <StatusBar hidden={true} />
      <TicketCardHistory
        Tickets={Tickets}
      />
    </View>
  )
}

const styles = StyleSheet.create({})