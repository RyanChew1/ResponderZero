import { View, Text } from 'react-native'
import React from 'react'
import { useParams } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const LogDetail = () => {
  const details = useLocalSearchParams();

  return (
    <View>
      <Text>Hi</Text>
    </View>
  )
}

export default LogDetail