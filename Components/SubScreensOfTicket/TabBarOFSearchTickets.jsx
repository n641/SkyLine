import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'

import OneWayScreen from './OneWayScreen'
import MultiDestinationScreen from './MultiDestinationScreen'
import RoundTripScreen from './RoundTripScreen'

const listTab = [
  {
    status: 'one Way',
    Key: 1
  },
  {
    status: 'Round Trip',
    Key: 2
  },
  {
    status: 'Multi Destination',
    Key: 3
  }
]


export default function TabBarOFSearchTickets({ navigation }) {
  const [Active, setActive] = useState('one Way')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listTab}>
        {
          listTab.map((e, i) => {
            return (
              <TouchableOpacity
                key={e.Key}
                style={[styles.btn, Active === e.status && styles.btnTabActive]}
                onPress={() => { setActive(e.status) }}>
                <Text style={styles.textbtn}>{e.status}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
      {
        Active === 'one Way' ? 
          <OneWayScreen navigation={navigation} />
          : Active === 'Round Trip' ?
            <RoundTripScreen navigation={navigation} />
            : <MultiDestinationScreen navigation={navigation} />
      }
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 37,
  },
  listTab: {
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20
  },
  btn: {
    width: Dimensions.get('window').width / 3.4,
    flexDirection: 'row',
    borderColor: '#EBEBEB',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textbtn: {
    fontSize: 16,
    fontFamily: 'item'
  },
  btnTabActive: {
    backgroundColor: '#00A7CC',
    borderRadius: 15,
  }
})