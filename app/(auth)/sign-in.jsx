import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router, Redirect } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = () => {
    try {
      setisSubmitting(true)
      signIn(form.email, form.password);
      router.push("/home")
    } catch (error) {
      setisSubmitting(false)
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
            className="w-[200px] h-[200px] self-center mt-7"
          />

          <Text className="text-2xl text-black text-semibold mt-10 font-psemibold self-center">
            Log in to Responder Zero
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Log in"
            handlePress={submit}
            containerStyles="mt-7 bg-primary rounded-2xl"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
