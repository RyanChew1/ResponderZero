import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import LogEntry from '../../components/LogEntry';


const logs = () => {
  return (
    <SafeAreaView>
      <Text
        className="text-3xl flex flex-row justify-start font-bold left-3">
        Logs
      </Text>

      <View className="mt-5 flex">
        <LogEntry
          date="01.01.24"
          time="05:24 pm"
        />
      </View>

      <StatusBar backgroundColor='#161622' style='dark'/>
    </SafeAreaView>
    
  )
}

export default logs