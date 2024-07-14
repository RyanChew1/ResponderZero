import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, Redirect, router } from "expo-router";
import { Marker, Callout } from "react-native-maps";
import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";


import { createUser, enterUserAddress } from "../../lib/appwrite";
import { Alert } from "react-native";

const signUpFinish = () => {
  // Get Location

  const [loc, setLoc] = useState(null);

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLoc(loc);
    })();
  }, []);

  let lat = 0;
  let long = 0;
  if (errorMsg) {
    text = errorMsg;
  } else if (loc) {
    long = parseFloat(JSON.stringify(loc.coords.longitude));
    lat = parseFloat(JSON.stringify(loc.coords.latitude));
    try {
      setMarkerPosition({
        latitude: lat,
        longitude: long,
      });
      setLocation({
        latitude: lat,
        longitude: long,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setLocation({
          latitude: lat,
          longitude: long,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Marker
  const [markerPosition, setMarkerPosition] = useState({
    latitude: lat,
    longitude: long,
  });

  const handleDragEnd = (e) => {
    setMarkerPosition(e.nativeEvent.coordinate);
    lat = e.nativeEvent.coordinate.latitude;
    long = e.nativeEvent.coordinate.longitude;
    setLocation({
      latitude: lat,
      longitude: long,
    });
  };

  // Submit
  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    setisSubmitting(true);
    if (location.latitude == 0) {
      await setLocation({
        latitude: lat,
        longitude: long,
      });
      if (lat != 0) {
        await setLocation({
          latitude: lat,
          longitude: long,
        });
        console.log(lat);
        console.log(long);

        try {
            await enterUserAddress(lat, long);
            router.push("/home");
        } catch (error) {
            console.log(error)
        }
        
      }
      setisSubmitting(false);
    } else {
      console.log(location.latitude);
      console.log(location.longitude);
      try {
        await enterUserAddress(lat, long);
        router.push("/home");
    } catch (error) {
        console.log(error)
    }
    }
  };

  return (
    <SafeAreaView className="bg-primary_light h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-2">
          <Image
            source={images.logoRounded}
            resizeMode="contain"
            className="w-[140px] h-[140px] self-center"
          />
          <Text className="text-2xl text-black text-semibold mt-4 font-psemibold self-center text-center">
            Finish signing up!
          </Text >
          <Text className="text-xl text-black text-semibold mt-1 font-pmedium self-center text-center">
            Please submit your home address to receive nearby calls.
          </Text>
          <Text className="text-sm mt-3 font-psemibold text-secondary text-center">
            Drag marker to change location
          </Text>

          <View className="w-full min-h-[300] max-h-[430] rounded-xl mt-2">
            <MapView
              className="w-full h-full"
              loadingEnabled={true}
              region={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: lat,
                  longitude: long,
                }}
                draggable={true}
                onDragEnd={handleDragEnd}
              ></Marker>
            </MapView>
          </View>

          <CustomButton
            title="Finish"
            handlePress={submit}
            containerStyles="mt-3 bg-primary rounded-2xl"
            isLoading={isSubmitting || lat == 0}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signUpFinish;
