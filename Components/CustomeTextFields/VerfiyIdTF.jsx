import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SelectDropdown from 'react-native-select-dropdown';

import Colors from '../../Conestant/Colors';


export default function VerfiyIdTF({text , HandleText}) {
    const { width } = Dimensions.get('window');
    const countries = [
        'ID',
        'Passport',
        
    ];
    console.log(text)
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Text style={styles.label}>Verfiy Id</Text>
                 <Text style={styles.astrisk}>*</Text> 
            </View>

            <SelectDropdown
                data={countries}

                onSelect={(selectedItem, index) => {
                    HandleText(selectedItem)
                }}
                defaultButtonText={'Choose type of id'}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'white'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        borderRadius: 9,
        borderWidth: 1,
        borderColor: 'white',
      },
      dropdown1BtnTxtStyle: {
        color: 'white', 
        textAlign: 'left',
        fontFamily:'item'

    },    
    dropdown1DropdownStyle: {
        backgroundColor: 'black'
    },
    dropdown1RowStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        borderBottomColor: 'black'
    },
    dropdown1RowTxtStyle: {
        color: 'white',
        textAlign: 'left',
        fontFamily:'item'
    },
    label: {
        fontFamily: 'item',
        fontSize: 20,
        color: "white",
        textAlign: 'left',
    },
    astrisk: {
        color: Colors.Google_logo,
        margin: 3
    },
})