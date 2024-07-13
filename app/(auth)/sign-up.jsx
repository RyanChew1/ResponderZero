import { ScrollView, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from "../../constants";
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = () => {
    createUser()
  }

  return (
    <SafeAreaView className="bg-primary_light h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-2">
          <Image source={images.logoRounded} resizeMode="contain" className="w-[180px] h-[180px] self-center mt-5"/>

          <Text className="text-2xl text-black text-semibold mt-10 font-psemibold self-center">
            Sign Up to Responder Zero
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles="mt-8"
            keyboardType="email-address"
        />

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({...form, email: e})}
          otherStyles="mt-7"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e})}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Sign Up"
          handlePress = {submit}
          containerStyles="mt-7 bg-primary rounded-2xl"
          isLoading={isSubmitting}
        />

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray font-pregular">
            Have an account already?
          </Text>
          <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
            Log In
          </Link>
        </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp;