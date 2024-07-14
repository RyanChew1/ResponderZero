import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import LogEntry from "../../components/LogEntry";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { getLogs, getReport } from "../../lib/appwrite";
import { Link } from "expo-router";

const logs = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    setIsSubmitting(true);
    router.push("/sign-up");
  };

  const open = (reportId) => {
    setIsSubmitting(true);
    router.push(`/log-detail?reportId=${reportId}`);
  };

  const [reportArray, setReportArray] = useState([]);

  const useGetLog = async() => {
    const log = await getLogs()
    setReportArray(log.documents[0].reportIds)
  }

  useGetLog()
  
  
  const getReportInfo = (reportId) => {
    const report =getReport(reportId)
    console.log(report)
  }

  getReportInfo(reportArray[0])
  

  // If not logged in
  if (!isLoading && !isLoggedIn) {
    return (
      <SafeAreaView className="bg-primary_light_2 h-full">
        <Text className="text-3xl flex flex-row justify-start font-bold left-3 mt-2">
          Logs
        </Text>

        <View className="mt-[20vh] w-full flex flex-col justify-self-center justify-center align-middle">
          <Text className="text-2xl text-center font-pmedium px-[20px]">
            Sign up or log in as a first responder to see recent nearby calls.
          </Text>
          <CustomButton
            title="Sign Up Now"
            handlePress={submit}
            containerStyles="mt-7 bg-primary rounded-2xl justify-center align-middle mx-[20px]"
            isLoading={isSubmitting}
          />
        </View>

        <StatusBar backgroundColor="#161622" style="dark" />
      </SafeAreaView>
    );
  } 


  return (
    <SafeAreaView className="bg-primary_light_2 h-full">
      <Text className="text-3xl flex flex-row justify-start font-bold left-3 mt-2">
        Logs
      </Text>

      <View className="mt-5 flex">
        {reportArray.map((element, index) => (
          <View key={index}>
            <LogEntry date="Jan 01 2024" time="05:24 pm" handlePress={open} reportId />
          </View>
        ))}
      </View>

      <StatusBar backgroundColor="#161622" style="dark" />
    </SafeAreaView>
  );
};

export default logs;
