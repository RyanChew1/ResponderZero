import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView} from 'react-native-safe-area-context';

import { images } from '../constants'

export default function App() {
  return (
    <SafeAreaView className="bg-primary_light h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logoText}
            className = 'w-[300px] h-[100px]'
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>

    
  );
}