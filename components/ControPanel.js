import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"; // Import Feather icons from expo
import Colors from "../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ControlPanel = ({ closeControlPanel }) => {
  const navigation = useNavigation();
  const [active, setActive] = useState("");
  const route = useRoute();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleNavigate = (location) => {
    navigation.navigate(location);
    setActive(location);
    closeControlPanel();
  };
  const handleLogout = async () => {
    const logoutTime = new Date().getTime();
    await AsyncStorage.setItem("lastLoginTime", JSON.stringify(logoutTime));
    navigation.replace("Login");
    dispatch(logout());
  };

  const controlPanelItems = [
    { label: "Update Profile", icon: "user" },
    { label: "Appointments", icon: "calendar" },
    { label: "Complaints", icon: "alert-circle" },
    { label: "Ask KeMi", icon: "help-circle" },
    { label: "Settings", icon: "settings" },
  ];

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 80,
        backgroundColor: Colors.gray,
      }}>
      <View className="flex items-center justify-center mb-10">
        <View className="w-28 h-28 rounded-full bg-white items-center justify-center ">
          <Text className="text-[25px]" style={{ color: Colors.primary }}>
            {`${user?.data?.Firstname?.charAt(0) || ""}${
              user?.data?.Lastname?.charAt(0) || ""
            }`}
          </Text>
        </View>
        <Text className="font-bold mt-1  " style={{ color: Colors.gray2 }}>
          {`${user?.data?.Lastname} ${user?.data?.Firstname}`}
        </Text>
      </View>
      {controlPanelItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: active === item.label ? Colors.white : Colors.gray,

            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() =>
            handleNavigate(item.label, {
              screen: route.name,
            })
          }>
          <Feather
            name={item.icon}
            size={21}
            color={active === item.label ? Colors.primary : Colors.primary}
            style={{ marginRight: 10, opacity: 0.6 }}
          />
          <Text
            style={{
              color: active === item.label ? Colors.primary : Colors.primary,
              fontSize: 15,
            }}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: "#478AFB",
          borderRadius: 10,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          bottom: 5,
          width: "100%",
          left: 20,
        }}
        onPress={handleLogout}>
        <Feather
          name="log-out"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ControlPanel;
