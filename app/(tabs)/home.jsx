import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeButton from "../../components/HomeButton";
import { router } from "expo-router";

import { icons } from "../../constants";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary_light_2 h-full">
      <Text className="text-3xl flex flex-row justify-start font-bold left-3 mt-2">
        Home
      </Text>

      <View className="flex flex-col gap-2 mt-5">
        <HomeButton
          styles="mt-5"
          title="Report Emergency"
          imageSource={icons.warning}
          handlePress={() => {
            router.push("/");
          }}
        />

        <HomeButton
          styles="mt-5"
          title="Sign Up as a First Responder"
          imageSource={icons.register}
          handlePress={() => {
            router.push("/sign-up");
          }}
        />

        <HomeButton
          styles="mt-5"
          title="Thank Our First Responders"
          imageSource={icons.gift}
          handlePress={() => {
            router.push("/");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
