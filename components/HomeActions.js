import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
} from "react-native";
import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from "rn-tourguide";

const HomeActions = () => {
  // Use Hooks to control!
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController();

  // Can start at mount 🎉
  // you need to wait until everything is registered 😁
  React.useEffect(() => {
    if (canStart) {
      // 👈 test if you can start otherwise nothing will happen
      start();
    }
  }, [canStart]); // 👈 don't miss it!

  const handleOnStart = () => console.log("start");
  const handleOnStop = () => console.log("stop");
  const handleOnStepChange = () => console.log(`stepChange`);

  React.useEffect(() => {
    eventEmitter.on("start", handleOnStart);
    eventEmitter.on("stop", handleOnStop);
    eventEmitter.on("stepChange", handleOnStepChange);

    return () => {
      eventEmitter.off("start", handleOnStart);
      eventEmitter.off("stop", handleOnStop);
      eventEmitter.off("stepChange", handleOnStepChange);
    };
  }, []);

  const navigation = useNavigation();
  const route = useRoute();

  const handleProfilePress = () => {
    navigation.navigate("UpdateProfile", {
      screen: route.name,
    });
  };

  const handleShareHistoryPress = async () => {
    try {
      // Implement logic to get the data you want to share
      const sharedData = "This is the data to share.";

      await Share.share({
        message: sharedData,
      });
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  const handleAsk KeMiPress = () => {
    navigation.navigate("Ask  KeMi", {
      screen: route.name,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.box, { backgroundColor: "#EAEAEA" }]}
        onPress={handleShareHistoryPress}>
        <Image
          source={require("../assets/images/data-sharing.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Share Records</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.box, { backgroundColor: "#EAEAEA" }]}
        onPress={handleAsk KeMiPress}>
        <Image
          source={require("../assets/images/confusion.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Ask  KeMi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.box, { backgroundColor: "#EAEAEA" }]}
        onPress={handleProfilePress}>
        <Image
          source={require("../assets/images/profile.png")}
          style={styles.image}
        />
        <TourGuideZone zone={3} shape={"rectangle_and_keep"}>
          <Text style={styles.text}>Update Profile</Text>
        </TourGuideZone>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
    position: "relative",
  },
  box: {
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "32%",
  },
  image: {
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain",
  },
  text: {
    fontSize: 14,
    fontFamily: "sen",
    position: "absolute",
    bottom: 2,
    marginBottom: 5,
  },
});

export default HomeActions;
