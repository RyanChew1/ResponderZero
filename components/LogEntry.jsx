import { View, Text } from 'react-native'
import React from 'react'

const LogEntry = ({
    date,
    time
}) => {
  return (
    <View className="px-5">
      <Text className="font-psemibold text-xl">
        Date
      </Text>
      <Text className="font-pmedium text-base">
        Time
      </Text>
    </View>
  )
}

export default LogEntry