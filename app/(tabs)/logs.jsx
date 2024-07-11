import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import LogEntry from '../../components/LogEntry';


const logs = () => {
  return (
    <SafeAreaView className="bg-primary_light_2">
      <Text
        className="text-3xl flex flex-row justify-start font-bold left-3 mt-2">
        Logs
      </Text>

      <View className="mt-5 flex">
        <LogEntry
          date="Jan 01 2024"
          time="05:24 pm"
        />
      </View>

      <StatusBar backgroundColor='#161622' style='dark'/>
    </SafeAreaView>
  )
}

export default logs