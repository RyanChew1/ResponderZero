import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView} from 'react-native-safe-area-context';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import GetLocation from 'react-native-get-location'
import Marker from 'react-native-maps';
import { useState } from 'react';

import { images, icons } from '../constants'
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: 37.78825,
}

export default function App() {
  const [address, setAddress] = useState({
    lat: INITIAL_REGION.latitude,
    lon: INITIAL_REGION.longitude
  })

  return (
    
    <SafeAreaView className="bg-primary_light_2 h-full">
      <View className=" flex flex-row justify-evenly align-bottom mt-4">
          <TouchableOpacity className="flex flex-row" onPress={() => {router.push('/home')}}>  
            <Image
              source={images.logoText}
              className = 'w-[300px] max-h-[90px] mr-12'
              resizeMode="contain"
            />

            <Image
              source={icons.cancel}
              className="w-7 h-7 mt-0 mr-4 mt-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ height: '100%' }}>
        
        <View className="w-full items-center h-full px-4 justify-start mt-5"> 

          <Text className="text-2xl font-pbold text-center text-black mt-1">
            Alert nearby first responders to an emergency
          </Text>

          <View className="w-full min-h-[300] max-h-[350] rounded-xl mt-3">
            <MapView 
              className="w-full h-full"
              provider = {PROVIDER_DEFAULT}
            />
          </View>

          <FormField 
            title="Enter Address"
            value={''}
            handleChangeText = {(e) => {
              // Implement location search to coords
            }}
            otherStyles = "mt-3"
          />

          <CustomButton 
            title="REPORT EMERGENCY"
            handlePress = {() => {
              router.push('/submitted')
            }}
            containerStyles = "w-full mt-3 bg-red rounded-xl"
          />
        </View> 
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='dark'/>

    </SafeAreaView>

    
  );
}