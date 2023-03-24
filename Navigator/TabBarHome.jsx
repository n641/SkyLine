import { StyleSheet, Text, View } from 'react-native'
import { Pressable } from 'react-native'
import React, { useReducer , useRef , useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'
import Lottie from 'lottie-react-native';
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated'

import Colors from '../Conestant/Colors'

import Home from '../Screens/Home/Home'
import CustomDrawer from './CustomDrawer'


const Tab = createBottomTabNavigator();
const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const TabBarHome = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator
        tabBar={(props) => <AnimatedTabBar {...props} />}
        screenOptions={{headerShown:false}}
      >
        <Tab.Screen name="Home" 
        options={{
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../assets/lotties/42174-home.json')} style={styles.icon} />,
        }}
        component={CustomDrawer} />
        <Tab.Screen name="Settings" 
         options={{
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../assets/lotties/38199-settings-roll.json')} style={styles.icon} />,
        }}
        component={CustomDrawer} />
        <Tab.Screen name="tickets"
         options={{
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../assets/lotties/37179-travel-tickets.json')} style={styles.icon} />,
        }}
        component={CustomDrawer} />
        <Tab.Screen name="profile"
         options={{
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../assets/lotties/116876-person-animation.json')} style={styles.icon} />,
        }}
        component={CustomDrawer} />
      </Tab.Navigator>
     </NavigationContainer>
  )
}



const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }) => {
  const { bottom } = useSafeAreaInsets();

  const reducer = (state, action) => {
    return [...state, { x: action.x, index: action.index }]
  }

  const handleLayout = (event, index) => {
    dispatch({ x: event.nativeEvent.layout.x, index })
  }

  const [layout, dispatch] = useReducer(reducer, [])

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({ index }) => index === activeIndex)?.x - 25
  }, [activeIndex, layout])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 300 }) }],
    }
  })




  return (
    <View style={[styles.tabBar, { paddingBottom: bottom +12 , borderRadius:20 }]}>
      <AnimatedSvg
        width={103}
        height={55}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill={Colors.fourth_dark_splash}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex
          const { options } = descriptors[route.key]
          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => { handleLayout(e, index) }}
              onPress={() => {
                navigation.navigate(route.name)
              }}
            />
          )
        })}
      </View>
    </View>
  )
}

// type TabBarComponentProps = {
//   active?: boolean
//   options: BottomTabNavigationOptions
//   onLayout: (e: LayoutChangeEvent) => void
//   onPress: () => void
// }

const TabBarComponent = ({active,options, onPress, onLayout }) => {

  const ref = useRef(null)

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play()
    }
  }, [active])

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 })
        }
      ]
    }
  })

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
    }
  })

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle ,animatedComponentCircleStyles ]}
      />
      <Animated.View style={[styles.iconContainer , animatedIconContainerStyles]}>
        {/* @ts-ignore */}
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  )
}

export default TabBarHome

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 50,
    width: 50,
    marginTop: -7,
    marginHorizontal:14.5,
    alignContent:'center',
    justifyContent:'center',
  },
  componentCircle: {
    flex: 1,
    borderRadius: 40,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 45,
    width: 55,
    bottom:-2,
  }
})