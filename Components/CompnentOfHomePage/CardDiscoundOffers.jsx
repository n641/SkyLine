import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function CardDiscoundOffers({ item, navigation }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' , width:width-30 , margin:15 , 
        backgroundColor:'rgba(30,30,30,0.8)', marginVertical:10 , borderRadius:10
        }}>
             <Image
                    source={{
                        uri: item?.imag
                    }} resizeMode="stretch" style={styles.image}
                />
            <View style={{marginLeft:25}}>
            <Text style={{fontSize:22 , fontFamily:'item' , color:'white'}}>{item.title}</Text>
            <Text style={{fontSize:13 , fontFamily:'item' , color:'white'}}>{item.descreption}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 110,
        height: 100,
        justifyContent: 'flex-end',
        borderRadius: 15,
        marginLeft:-5
    },
})