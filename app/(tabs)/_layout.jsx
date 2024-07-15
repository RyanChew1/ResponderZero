import { View, Text, Image } from 'react-native'
import { Tabs, Redirect} from 'expo-router';
import React from 'react'
import {icons} from '../../constants';

const TabIcon = ({icon, color, name, focused}) => {
  return(
    <View  className="flex items-center justify-center gap-2">
      <Image 
        source={icon}
        resizeMode="contain"
        color={color}
        className="w-6 h-6"
      />

      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ffa770', //Theme Color Light
          tabBarInactiveTintColor: '#7d7978', //Gray
          tabBarStyle: {
            backgroundColor: '#2e2d2d', //Black
            borderTopWidth: 1,
            borderTopColor: '#7d7978', //Gray
            height: 84,
          }
        }}
      >
        <Tabs.Screen 
          name = "home"
          options = {{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={icons.home} color={color} name="Home" focused={focused}/>
            )
          }}
        />
        
      </Tabs>
    </>
  )
}

export default TabsLayout