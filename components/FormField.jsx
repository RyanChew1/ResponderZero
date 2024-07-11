import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { icons } from "../constants";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-black font-pmedium">
            {title}
        </Text>

        <View className={`border-2 border-gray_2 w-full h-16 px-4 bg-gray_3 rounded-2xl focus:border-secondary_light flex flex-row items-center`}>
            <TextInput 
                className="flex-1 text-white font-psemibold text-base"
                value={showPassword ? value : value.replace(/./g, '*')}

                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
            />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 "
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        </View>
    </View>
  );
};

export default FormField;