import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  Button,
  Share,
  Modal,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import Colors from "../../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import MyStatusBar from "../../helpers/MyStatusBar";
const { width, height } = Dimensions.get("window");
import {
  CopilotProvider,
  CopilotStep,
  walkthroughable,
  useCopilot,
} from "react-native-copilot";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/reducers/auth/authSlice";

const CopilotText = walkthroughable(Text);
const CopilotView = walkthroughable(View);

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [lastLoginTime, setLastLoginTime] = useState();
  const { start, copilotEvents } = useCopilot();
  const [modalVisible, setModalVisible] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleProfilePress = () => {
    navigation.navigate("UpdateProfile", {
      screen: route.name,
    });
  };

  const getLastLoginTime = async () => {
    const logoutTime = await AsyncStorage.getItem("lastLoginTime");

    if (logoutTime) {
      const formattedDate = new Date(
        parseInt(logoutTime, 10)
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setLastLoginTime(formattedDate);
    }
  };

  useEffect(() => {
    getLastLoginTime();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem("firstLaunchTour");
      if (value === null) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error reading from AsyncStorage:", error);
    }
  };

  const setFirstGuide = async () => {
    try {
      await AsyncStorage.setItem("firstLaunchTour", "true");
    } catch (error) {
      console.error("Error setting firstLaunchTour in AsyncStorage:", error);
    }
  };

  copilotEvents.on("stop", setFirstGuide);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    start();
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

  const handleAskKeMiPress = () => {
    navigation.navigate("Ask  KeMi", {
      screen: route.name,
    });
  };

  return (
    <>
      <MyStatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View className="bg-white p-5 rounded-md">
            <Text className="my-2" style={{}}>
              Start your tour guide{" "}
            </Text>
            <Button title="Start" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <SafeAreaView className="bg-white flex-1 ">
        <View className="p-7 mt-5 space-y-2">
          <Text className="text-[23px] font-bold" style={{}}>
            Hi, Mr {`${user?.data?.Lastname} ${user?.data?.Firstname}`} 🎉
          </Text>
          {!user?.data?.UpdatedUser && (
            <Text>Please update your profile to add medical history.</Text>
          )}
          <Text style={{ fontFamily: "sen" }}>
            Last check-in: {lastLoginTime}. What's new with your health today?
          </Text>
        </View>
        <View>
          <Image
            alt="welcome image"
            source={require("../../assets/images/homeImg.png")}
            style={{
              resizeMode: "contain",
              width: width,
              height: Platform.OS === "ios" ? height * 0.35 : height * 0.3,
            }}
          />
        </View>
        <View className=" mt-1 rounded-full flex flex-col items-center justify-center">
          <CopilotStep
            order={2}
            text="Please fill up your intake form"
            name="form">
            <CopilotView className="">
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate("IntakeForm")}
                className="px-3 py-3 m-2 rounded-lg shadow-lg flex flex-row space-x-4 items-center justify-center mt-2"
                style={{ backgroundColor: Colors.primary, width: width * 0.7 }}>
                <Text
                  className="text-white font-ca text-[20px] font-bold"
                  style={{}}>
                  {" "}
                  Add my medical history
                </Text>
                <FontAwesome name="wpforms" size={20} color="#fff" />
              </TouchableOpacity>
            </CopilotView>
          </CopilotStep>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.box, { backgroundColor: "#EAEAEA" }]}
            onPress={handleShareHistoryPress}>
            <Image
              source={require("../../assets/images/data-sharing.png")}
              style={styles.image}
            />
            <CopilotStep
              text="You can share your records"
              order={3}
              name="share">
              <CopilotText style={styles.text}>Share Records</CopilotText>
            </CopilotStep>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, { backgroundColor: "#EAEAEA" }]}
            onPress={handleAskKeMiPress}>
            <Image
              source={require("../../assets/images/confusion.png")}
              style={styles.image}
            />
            <CopilotStep
              text="You can ask your assitstant KEMI, Coming soon."
              order={4}
              name="kemi">
              <CopilotText style={styles.text}>Ask KeMi</CopilotText>
            </CopilotStep>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.box, { backgroundColor: "#EAEAEA" }]}
            onPress={handleProfilePress}>
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.image}
            />
            <CopilotStep
              text="Please update your profile"
              order={1}
              name="profile">
              <CopilotText style={styles.text}>Update Profile</CopilotText>
            </CopilotStep>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

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
    paddingHorizontal: 5,
    paddingVertical: 20,
    width: "32%",
  },
  image: {
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain",
  },
  text: {
    fontSize: 12,
    fontFamily: "sen",
    position: "absolute",
    bottom: 2,
    marginBottom: 5,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
