import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../helpers/Colors";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import NavigationBar from "../../components/NavigationBar";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";

const AskKemiScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { openControlPanel } = route.params;

  const KeMis = [
    {
      link: "Medical Diagnosis (Problems)",
      title: "Medical Terminology Lookup",
      icon: (
        <MaterialIcons
          name="medical-services"
          size={22}
          color={Colors.primary}
        />
      ),
    },
    {
      link: "Drug Info Request",
      title: "Medication Lookup",
      icon: <Fontisto name="pills" size={22} color={Colors.primary} />,
    },
    // {
    //   title: "Lab Test Request",
    //   icon: <Fontisto name="laboratory" size={22} color={Colors.primary} />,
    // },
    // {
    //   title: "Medical Procedure Request",
    //   icon: (
    //     <FontAwesome5
    //       name="file-medical-alt"
    //       size={22}
    //       color={Colors.primary}
    //     />
    //   ),
    // },
  ];

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />
      <BackButton color={Colors.primary} content="" font="bold" />
      <View className="flex-1 bg-white px-4">
        <Text className="my-3 text-sm opacity-80">
          <Text className="text-red-500">(*)</Text> Hi, {user?.data?.Firstname}.
          I am KeMi your medical support assistant. What information would you
          like to search below?
        </Text>

        <View>
          {KeMis.map((kemi, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate(`${kemi.link}`, {
                  screen: route.name,
                })
              }
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
                    {kemi.icon}
                  </View>

                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.white,
                      fontWeight: "bold",
                    }}>
                    {kemi.title}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={Colors.white}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default AskKemiScreen;
