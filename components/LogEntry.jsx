import { View, Text, Image } from 'react-native'
import React from 'react'

import { icons } from "../constants";
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const LogEntry = ({
    date,
    time
}) => {
  return (
    <View className="border-solid border-2 border-primary_light px-5 py-7 flex flex-row w-full">
        <View className=" flex flex-col w-[85%]">
        <Text className="font-psemibold text-xl">
            {date}
        </Text>
        <Text className="font-pmedium text-base">
            {time}
        </Text>
        </View>
      
      <TouchableOpacity
        onPress={() => {
            router.push("/") // Search page
        }}
      >
        <Image
            source={icons.open}
            className="w-9 h-9 ml-5 align-middle"
        />
      </TouchableOpacity>
        
      
    </View>
  )
}

export default LogEntry