import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView} from 'react-native-safe-area-context';

import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';

export default function App() {
  return (
    <SafeAreaView className="bg-primary_light h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        
        <View className="w-full justify-center items-center min-h-[85vh] px-4"> 
        {/* MAP HERE */}

        {/* <FormField 
          title="Enter Address"
        /> */}

          <Image
            source={images.logoText}
            className = 'w-[300px] h-[100px]'
            resizeMode="contain"
          />
          
          <CustomButton 
            title="REPORT EMERGENCY"
            handlePress = {() => {
              router.push('/home')
            }}
            containerStyles = "w-full mt-7 bg-secondary rounded-xl"
          />
        </View> 
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='dark'/>

    </SafeAreaView>

    
  );
}