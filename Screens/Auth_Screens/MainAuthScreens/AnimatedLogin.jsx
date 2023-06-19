import { StyleSheet, Text, View, Dimensions } from 'react-native'
import styles from './AuthStyle'
import React, { useState } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withSpring } from 'react-native-reanimated'
import { LinearGradient } from "expo-linear-gradient";


import Colors from '../../../Conestant/Colors'
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg'


import BG from '../../../assets/bg1.jpg'
import logoDark from '../../../assets/logo-dark.png'
import logoLight from '../../../assets/logo-light.png'

import SignUpScreen from '../SignUpScreen';
import SigninScreen from '../SignInScreen';
import MainButton from '../../../Components/MainButton'


export default function AnimatedLogin({ navigation }) {
  const { height, width } = Dimensions.get('window')
  const [Signup, setSignup] = useState(false)

  ///////////////////////////////////////////animation////////////////////////
  const imagePostion = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePostion.value, [0, 1], [Signup ? -height / 0.95 : -height / 1.4, 0])
    return {
      transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
    }
  })

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePostion.value, [0, 1], [250, 0])
    return {
      opacity: withTiming(imagePostion.value, { duration: 500 }),
      transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]

    }
  })

  const CloseAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePostion.value, [0, 1], [180, 360])
    return {
      opacity: withTiming(imagePostion.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [{ rotate: withTiming(interpolation + "deg", { duration: 1000 }) }]

    }
  })

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imagePostion.value === 0 ? withDelay(400, withTiming(1, { duration: 800 })) : withTiming(0, { duration: 300 }),


    }
  })


  const moveToLogin = () => {
    imagePostion.value = 0;
    if (Signup) {
      setSignup(false)
    }
  }

  const moveToSignUp = () => {
    imagePostion.value = 0;
    if (!Signup) {
      setSignup(true)
    }
  }

  const handleDontHaveAcouunt = () => {
    imagePostion.value = 1;
    setSignup(false)
  }



  return (
    <View
      style={styles.screen}
    >

      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle ]}>

        <Svg height={height + 100} width={width} >
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            href={BG}
            width={width}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath='url(#clipPathId)'
          />

          <Image
            href={logoLight}
            width={width}
            height={height/2.4}
            clipPath='url(#clipPathId)'
          />

        </Svg>

        <Animated.View style={[styles.closeButtonContainer, CloseAnimatedStyle]}>
          <Text style={{ color: 'black', fontSize: 15 }} onPress={() => { imagePostion.value = 1 }} >X</Text>
        </Animated.View>

      </Animated.View>

      <View style={styles.buttonContainer}>
        <Animated.View style={buttonAnimatedStyle}>
          <MainButton title="Log in" color={Colors.Button} onClick={() => { moveToLogin() }} />
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle}>
          <MainButton title="Sign up" color={Colors.Button} onClick={() => { moveToSignUp() }} />
        </Animated.View>
      </View>


      <Animated.View style={[styles.inputContainer, formAnimatedStyle, {}]}>

        {Signup ?
          (<SignUpScreen DontHaveAcouunt={() => { handleDontHaveAcouunt() }} navigation={navigation} />) : <SigninScreen DontHaveAcouunt={() => { handleDontHaveAcouunt() }} navigation={navigation} />
        }

      </Animated.View>
    </View>

  )
}
