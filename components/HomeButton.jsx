import { View, Text, Image } from "react-native";
import React from "react";

import { icons } from "../constants";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const HomeButton = ({ title, imageSource, handlePress, styles }) => {
  return (
    <TouchableOpacity
      className={`flex flex-col justify-center $styles mt-6`}
      onPress={handlePress}
    >
      <View className="border-solid border-2 border-secondary rounded-md mx-5 flex flex-row bg-secondary_light h-[20vh] align-middle space-x-32 justify-center">
        <View className="flex-col w-[50%] justify-center">
          <Text className="font-extrabold text-3xl left-5 w-full left-8 text-secondary_dark">
            {title}
          </Text>
        </View>
        <Image
          className="h-[90] w-[90] flex-col justify-seld-center justify-center align-middle top-[13%] right-8"
          source={imageSource}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HomeButton;
