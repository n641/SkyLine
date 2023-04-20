import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import InputRange from '../InputRange'
import { RadioButton } from 'react-native-paper';


export default function BottomSheetTickets({HandleFiltermin,HandleFiltermax}) {
  const [checked, setChecked] = React.useState('first');

  const rate = [
    {
      text: "+1",
      value: 'first'
    },
    {
      text: "+2",
      value: 'second'
    },
    {
      text: "+3",
      value: 'thired'
    },
    {
      text: "+4",
      value: 'fourth'
    },
    {
      text: "+5",
      value: 'fifth'
    },]

  return (
    <View>
      <InputRange min={0} max={1000} steps={5} title='nono' onValueChange={(range) => {
        HandleFiltermin(range.min)
        HandleFiltermax(range.max)
      }}
      />

      <Text style={{ fontSize: 20, fontFamily: 'item', marginTop: 15, marginLeft: 15 }}>Rate</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginHorizontal: 20, margin: 10 }}>

        {
          rate.map((e, i) => {
            return (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>

                <RadioButton
                  value={e.value}
                  status={checked === e.value ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(e.value)}
                />
                <Text style={{ fontSize: 20, color: 'black', fontFamily: 'item' }}>{e.text}</Text>
              </View>
            )
          })
        }

      </View>
    </View>
  )
}

const styles = StyleSheet.create({})