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

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userDetails = [
    { label: "DOB", value: "01/15/1980" },
    { label: "AGE", value: "42" },
    { label: "SEX assigned at birth", value: "Male" },
    {
      label: "Address",
      value: "123 Main Street, Cityville, State, Zip Code",
    },
    { label: "Mobile phone", value: "+1234567890" },
    { label: "Name of emergency contact", value: "Jane Doe" },
    { label: "Emergency contact mobile phone", value: "+9876543210" },
    { label: "Relationship to Emergency Contact", value: "Spouse" },
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
