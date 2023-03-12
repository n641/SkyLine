import { StyleSheet ,Dimensions } from "react-native"

import colors from '../../../Conestant/Colors'
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"flex-end",
        backgroundColor:colors.first_dark_splash,
    },
    button:{
        backgroundColor:colors.Button,
        height:55,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:35,
        marginHorizontal:20,
        marginVertical:10,
        borderWidth:1,
        borderColor:'white'
    },
    buttonText:{
        fontSize:20,
        fontFamily:'item',
        color:'white',
        letterSpacing:0.5
    },
    buttonContainer:{
        justifyContent:"space-evenly",
        height:height/3,
        alignItems:"center",

    },
    inputContainer:{
        marginHorizontal:10,
        marginBottom:5,
        ...StyleSheet.absoluteFill,
        zIndex:-1,
        justifyContent:"flex-end",
    },
    closeButtonContainer:{
        height:40,
        width:40,
        justifyContent:"center",
        alignSelf:"center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 15,
        backgroundColor:'white',
        alignItems:"center",
        borderRadius:20,
        top:-20,
        right:8
    }
})

export default styles