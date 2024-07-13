import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GetLocation from "react-native-get-location";
import { Marker, Callout } from "react-native-maps";
import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";

import { images, icons } from "../constants";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { SearchBar } from "@rneui/themed";

import {
  GOOGLE_PLACES_API_KEY,
  GOOGLE_GEOLOCATION_API_KEY,
  JAVASCRIPT_MAP_API_KEY,
} from "../lib/maps";

export default function App() {
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
        router.push("/submitted");
      }
      setisSubmitting(false);
    } else {
      console.log(location.latitude);
      console.log(location.longitude);
      router.push("/submitted");
    }
  };

  return (
    <SafeAreaView className="bg-primary_light_2 h-full">
      <View className=" flex flex-col justify-evenly align-bottom mt-4">
        <TouchableOpacity
          className="flex flex-row"
          onPress={() => {
            router.push("/home");
          }}
        >
          <Image
            source={images.logoText}
            className="w-[300px] max-h-[90px] mr-12"
            resizeMode="contain"
          />

          <Image
            source={icons.cancel}
            className="w-7 h-7 mr-4 mt-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <SafeAreaView className="px-5">
        <Text className="text-2xl font-pbold text-center text-black bottom-3">
          Alert nearby first responders to an emergency
        </Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center h-full px-4 justify-start mt-3">
          <Text className="text-sm mt-3 font-psemibold text-secondary">
            Drag marker to change location
          </Text>

          <View className="w-full min-h-[300] max-h-[350] rounded-xl">
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
            title={lat == 0 ? "Loading.." : "REPORT EMERGENCY"}
            handlePress={submit}
            containerStyles="w-full mt-3 bg-red rounded-xl"
            isLoading={isSubmitting || lat == 0}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="dark" />
    </SafeAreaView>
  );
}
