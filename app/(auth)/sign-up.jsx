import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, Redirect, router } from "expo-router";

import { createUser } from "../../lib/appwrite";
import { Alert } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password || !form.phone) {
      Alert.alert("Error", "Please fill in all fields!");
    }

    try {
      parseInt(form.phone);
    } catch (error) {
      Alert.alert("Error", "Please enter valid phone number");
      return;
    }

    setisSubmitting(true);

    try {
      const result = await createUser(
        form.email,
        form.password,
        form.username,
        form.phone
      );

      router.replace("/sign-up-finish");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary_light h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-2">
        <TouchableOpacity
            className="flex flex-row left-[80vw]"
            onPress={() => {
              router.push("/home");
            }}
          >
            <Image
              source={icons.cancel}
              className="w-7 h-7 mr-4 mt-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image
            source={images.logoRounded}
            resizeMode="contain"
            className="w-[140px] h-[140px] self-center"
          />
          <Text className="text-2xl text-black text-semibold mt-4 font-psemibold self-center">
            Sign Up to Responder Zero
          </Text>

          <FormField
            title="Name"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-3"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-3"
            keyboardType="email-address"
          />

          <FormField
            title="Phone Number"
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e })}
            otherStyles="mt-3"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-3"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-3 bg-primary rounded-2xl"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Log In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
