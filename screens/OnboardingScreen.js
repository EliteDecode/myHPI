import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, Image, Dimensions } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const imageWidth = width;
const imageHeight = height * 0.5;

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  const handleDone = () => {
    AsyncStorage.setItem("firstLaunch", "false");
    navigation.replace("Welcome");
  };

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem("firstLaunch");
      if (value === null) {
        // First launch
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error("Error reading from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    // Loading state, you might want to render a loading indicator here
    return null;
  }

  if (!isFirstLaunch) {
    // Not the first launch, skip onboarding and navigate to the welcome screen
    navigation.replace("Welcome");
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{ flex: 1 }}>
        <Onboarding
          pages={[
            {
              backgroundColor: "#fff",
              image: (
                <Image
                  source={require("../assets/images/onboarding/onBoarding4.jpg")}
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                  }}
                />
              ),
              title: (
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 2,
                  }}>
                  Explore a World of seamless medical operations
                </Text>
              ),
              subtitle: (
                <Text style={{ fontSize: 12 }}>
                  Reducing physician/pateints charting time
                </Text>
              ),
            },
            {
              backgroundColor: "#fff",
              image: (
                <Image
                  source={require("../assets/images/onboarding/onBoarding5.jpg")}
                  style={{ width: imageWidth, height: imageHeight }}
                />
              ),
              title: (
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 2,
                  }}>
                  Appointment Scheduling
                </Text>
              ),
              subtitle: (
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                  }}>
                  Schedule and manage your time and healthcare on your terms.
                </Text>
              ),
            },
            {
              backgroundColor: "#fff",
              image: (
                <Image
                  source={require("../assets/images/onboarding/onBoarding6.jpg")}
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    resizeMode: "contain",
                  }}
                />
              ),
              title: (
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 2,
                  }}>
                  Seamless Arrival
                </Text>
              ),
              subtitle: (
                <Text style={{ fontSize: 12, textAlign: "center" }}>
                  Arrive stress-free knowing your forms are submitted and
                  appointments scheduled.
                </Text>
              ),
            },
          ]}
          onDone={handleDone}
          onSkip={handleDone}
        />
      </View>
    </>
  );
};

export default OnboardingScreen;
