import { View, Text, Image } from 'react-native'
import React from 'react'

import { icons } from "../constants";
import { TouchableOpacity } from 'react-native';

const LogEntry = ({
    date,
    time
}) => {
  return (
    <View className="border-solid border-2 border-primary_light px-5 py-7 flex-row">
        <View className="flex-col">
        <Text className="font-psemibold text-xl">
            {date}
        </Text>
        <Text className="font-pmedium text-base">
            {time}
        </Text>
        </View>
      
      <TouchableOpacity>
        <Image
            source={icons.open}
            className="w-9 h-9 ml-5 justify-self-end justify-end"
        />
      </TouchableOpacity>
        
      
    </View>
  )
}

export default LogEntry