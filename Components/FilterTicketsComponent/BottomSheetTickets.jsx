import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import InputRange from '../InputRange'
import { RadioButton } from 'react-native-paper';


export default function BottomSheetTickets({ HandleFiltermin, HandleFiltermax, HandleFilterRate, Rate }) {
  
  const [checked, setChecked] = React.useState('zero');
  const ratee = [
    {
      text: "+0",
      value: 'zero',
      number: 0
    }, {
      text: "+1",
      value: 'first',
      number: "1"
    },
    {
      text: "+2",
      value: 'second',
      number: 2
    },
    {
      text: "+3",
      value: 'thired',
      number: 3
    },
    {
      text: "+4",
      value: 'fourth',
      number: 4
    },
    {
      text: "+5",
      value: 'fifth',
      number: 5
    },]

  return (
    <View>
      <InputRange min={0} max={1000} steps={5} title='nono' onValueChange={(range) => {
        HandleFiltermin(range.min)
        HandleFiltermax(range.max)
      }}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Rate</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginHorizontal: 20, margin: 10 }}>

        {
          ratee.map((e, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value={e.value}
                  status={checked === e.value ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(e.value)
                    HandleFilterRate(e.number)
                    // console.log(Rate)
                  }}
                />
                <Text style={{ fontSize: 20, color: 'black', fontFamily: 'item' }}>{e.text}</Text>
              </View>
            )
          })
        }
      </View>
      <View style={styles.rangeContainer} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#eee',
    borderTopWidth: 1,
    borderColor: '#cccdb2',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15
  },
  title: {
    color: '#777',
    fontSize: 12
  },
  rangeContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderBottomWidth: 1
  },
})