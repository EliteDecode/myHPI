import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"; // Import Feather icons from expo
import Colors from "../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

const ControlPanel = ({ closeControlPanel }) => {
  const navigation = useNavigation();
  const [active, setActive] = useState("");
  const route = useRoute();

  const handleNavigate = (location) => {
    navigation.navigate(location);
    setActive(location);
    closeControlPanel();
  };
  const handleLogout = () => {
    navigation.replace("Login");
  };

  const controlPanelItems = [
    { label: "Profile", icon: "user" },
    { label: "Appointments", icon: "calendar" },
    { label: "Complaints", icon: "alert-circle" },
    { label: "Ask Kemi", icon: "help-circle" },
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
            AB
          </Text>
        </View>
        <Text
          className="font-bold mt-1  "
          style={{ fontFamily: "ca", color: Colors.gray2 }}>
          John Michealis
        </Text>
        <Text className="" style={{ fontFamily: "sen", color: Colors.gray2 }}>
          sirelite11@gmail.com
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
          onPress={() => handleNavigate(item.label)}>
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
              fontFamily: "ca",
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