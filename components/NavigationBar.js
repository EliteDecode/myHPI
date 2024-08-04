import { View, Text, Platform } from "react-native";
import React, { useEffect } from "react";
import Colors from "../helpers/Colors";
import { TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/base";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import MyStatusBar from "../helpers/MyStatusBar";
import { rMS } from "../styles/responsiveness";

const NavigationBar = ({ openControlPanel }) => {
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const route = useRoute();

  return (
    <>
      <View>
        <View
          className="px-3 py-3"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: Colors.gray,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={openControlPanel}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}>
            <View
              style={{
                alignItems: "center",
                marginTop: Platform.OS === "ios" ? rMS(30) : rMS(25),
              }}>
              <Feather name="menu" size={30} color={Colors.primary} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
                screen: route.name,
              })
            }
            activeOpacity={0.6}
            style={{
              flexDirection: "row",
              position: "relative",
              marginTop: Platform.OS === "ios" ? rMS(30) : rMS(25),
            }}>
            <Avatar
              size={30}
              rounded
              title={`${user?.data?.Firstname?.charAt(0) || ""}${
                user?.data?.Lastname?.charAt(0) || ""
              }`}
              containerStyle={{ backgroundColor: Colors.primary }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default NavigationBar;
