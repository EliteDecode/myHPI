import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../helpers/Colors";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import NavigationBar from "../../components/NavigationBar";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";

const ComplaintsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [intakeFormStatus, setIntakeFormStatus] = useState();
  const { user } = useSelector((state) => state.auth);

  const checkIntake = async () => {
    try {
      const storedIntakeFormStatus = await AsyncStorage.getItem(
        `IntakeformStatus_${user?.data?._id}`
      );

      setIntakeFormStatus(JSON.parse(storedIntakeFormStatus));
    } catch (error) {
      // Handle errors if any
      console.error("Error checking intake form:", error.message);
    }
  };

  useEffect(() => {
    checkIntake();
  }, []);

  const { openControlPanel } = route.params;

  const handleNewComplaint = () => {
    if (intakeFormStatus == "") {
      Alert.alert(
        "Information",
        "Kindly complete and update your medical history prior to initiating a new complaint.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("IntakeForm", {
                screen: route.name,
              });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate("New Complaint", {
        screen: route.name,
      });
    }
  };

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />
      <View className="flex-1 bg-white p-4">
        <Text className="my-3 text-sm opacity-80">
          Explore and modify your previously submitted complaints if your
          current concern pertains to the same body part.
        </Text>

        <View>
          <TouchableOpacity
            onPress={handleNewComplaint}
            style={{ marginBottom: 16, backgroundColor: Colors.primary }}
            className="  px-2 rounded-xl">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
              }}>
              <View className="flex-row items-center justify-center space-x-2">
                <View className=" px-1.5 py-1.5 rounded-full bg-white">
                  <MaterialIcons
                    name="post-add"
                    size={22}
                    color={Colors.primary}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.white,
                    fontWeight: "bold",
                  }}>
                  Start a New Complaint
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={Colors.white} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Previous Complaints", {
                screen: route.name,
              })
            }
            style={{ marginBottom: 16, backgroundColor: Colors.primary }}
            className=" px-2 rounded-xl">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
              }}>
              <View className="flex-row items-center justify-center space-x-2">
                <View className=" px-1.5 py-1.5 rounded-full bg-white">
                  <MaterialCommunityIcons
                    name="page-previous"
                    size={22}
                    color={Colors.primary}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.white,
                    fontWeight: "bold",
                  }}>
                  View All Complaints
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={Colors.white} />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate("Meds Request", {
                screen: route.name,
              })
            }
            style={{ marginBottom: 16, backgroundColor: Colors.primary }}
            className=" px-2 rounded-xl">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
              }}>
              <View className="flex-row items-center justify-center space-x-2">
                <View className=" px-1.5 py-1.5 rounded-full bg-white">
                  <Fontisto name="pills" size={22} color={Colors.primary} />
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.white,
                    fontWeight: "bold",
                  }}>
                  Request for Medications
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={Colors.white} />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
};

export default ComplaintsScreen;
