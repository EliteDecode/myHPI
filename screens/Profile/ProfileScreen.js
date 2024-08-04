import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import NavigationBar from "../../components/NavigationBar";
import { Ionicons } from "@expo/vector-icons";
import { rMS, rS, rVS } from "../../styles/responsiveness";

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { openControlPanel } = route.params;
  const { user } = useSelector((state) => state.auth);

  const userDetails = [
    { label: "DOB", value: user?.data?.DOB ? user?.data?.DOB : "Not Set" },
    {
      label: "SEX assigned at birth",
      value: user?.data?.Sex ? user?.data?.Sex : "Not Set",
    },
    {
      label: "Address",
      value: user?.data?.Address ? user?.data?.Address : "Not Set",
    },
    {
      label: "Mobile phone",
      value: user?.data?.Phone ? user?.data?.Phone : "Not Set",
    },
    {
      label: "Name of emergency contact",
      value: user?.data?.EmergencyContactName
        ? user?.data?.EmergencyContactName
        : "Not Set",
    },
    {
      label: "Emergency contact mobile phone",
      value: user?.data?.EmergencyContactPhone
        ? user?.data?.EmergencyContactPhone
        : "Not Set",
    },
    {
      label: "Relationship to Emergency Contact",
      value: user?.data?.EmergencyContactRelationship
        ? user?.data?.EmergencyContactRelationship
        : "Not Set",
    },
  ];

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />
      <View
        className=""
        style={{ backgroundColor: Colors.gray2, height: rVS(110) }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(route.params.screen || "Home")}
          className="mt-5 flex-row space-x-2 items-center ">
          <Ionicons
            name="arrow-back"
            size={rMS(28)}
            color={Colors.white}
            style={{ marginLeft: rMS(16) }}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <View style={{ backgroundColor: Colors.gray2 }}></View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className=" bg-white  h-screen -mt-16"
          style={{ borderTopEndRadius: 50, borderTopStartRadius: 50 }}>
          <View className="items-center justify-center mt-10">
            <Image
              source={require("../../assets/images/confirm.jpg")}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                marginBottom: rMS(10),
                borderColor: Colors.primary,
                borderWidth: 4,
              }}
            />
            <View className="flex-row space-x-2">
              <Text
                className="font-bold text-[19px] "
                style={{ fontFamily: "ca", color: Colors.gray2 }}>
                {user?.data?.Firstname} {user?.data?.Lastname}
              </Text>
              <TouchableOpacity
                className=""
                onPress={() =>
                  navigation.navigate("Update Profile", {
                    screen: route.name,
                  })
                }>
                <Feather name="edit" size={rMS(22)} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            <Text
              className="mt-0.5"
              style={{ fontFamily: "sen", color: Colors.gray2 }}>
              {user?.data?.Email}
            </Text>
          </View>
          <ScrollView className="mt-5 space-y-3 px-5 py-4">
            {userDetails?.map((details, index) => (
              <View className=" px-3 py-3  rounded-lg bg-gray-200" key={index}>
                <Text
                  className="text-[14px] font-bold"
                  style={{ fontFamily: "ca", color: Colors.gray2 }}>
                  {details.label}
                </Text>
                <Text
                  className="text-[15px]"
                  style={{ fontFamily: "sen", color: Colors.gray2 }}>
                  {details.value}
                </Text>
              </View>
            ))}
            <View style={{ marginBottom: rMS(40) }}></View>
          </ScrollView>
        </ScrollView>
      </View>
    </>
  );
};

export default ProfileScreen;
