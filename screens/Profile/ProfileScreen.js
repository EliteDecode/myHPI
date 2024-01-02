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

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = useSelector((state) => state.auth);

  const userDetails = [
    { label: "DOB", value: user?.data?.DOB ? user?.data?.DOB : "Not Set" },
    { label: "AGE", value: user?.data?.Age ? user?.data?.Age : "Not Set" },
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
    <View className="flex-1">
      <View className="h-36" style={{ backgroundColor: Colors.gray2 }}></View>
      <View
        className=" bg-white  h-screen -mt-16"
        style={{ borderTopEndRadius: 50, borderTopStartRadius: 50 }}>
        <View className="items-center justify-center mt-10">
          <Image
            source={require("../../assets/images/confirm.jpg")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              marginBottom: 10,
              borderColor: Colors.primary,
              borderWidth: 4,
            }}
          />
          <View className="flex-row space-x-2">
            <Text
              className="font-bold text-[19px] "
              style={{ fontFamily: "ca", color: Colors.gray2 }}>
              John Michealis
            </Text>
            <TouchableOpacity
              className=""
              onPress={() =>
                navigation.navigate("UpdateProfile", {
                  screen: route.name,
                })
              }>
              <Feather name="edit" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <Text
            className="mt-0.5"
            style={{ fontFamily: "sen", color: Colors.gray2 }}>
            sirelite11@gmail.com
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
          <View style={{ marginBottom: 300 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
