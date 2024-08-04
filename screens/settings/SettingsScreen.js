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
import { rMS } from "../../styles/responsiveness";

const SettingsScreen = ({ route }) => {
  const navigation = useNavigation();

  const { openControlPanel } = route.params;

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />
      <View className="flex-1 bg-white p-4">
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Change Password", {
                screen: route.name,
              })
            }
            style={{ marginBottom: rMS(16), backgroundColor: Colors.primary }}
            className=" px-2 rounded-xl">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: rMS(8),
              }}>
              <View className="flex-row items-center justify-center space-x-2">
                <View className=" px-1.5 py-1.5 rounded-full bg-white">
                  <MaterialCommunityIcons
                    name="lock"
                    size={rMS(18)}
                    color={Colors.primary}
                  />
                </View>

                <Text
                  style={{
                    fontSize: rMS(14),
                    color: Colors.white,
                    fontWeight: "bold",
                  }}>
                  Change Password
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={rMS(24)}
                color={Colors.white}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Delete Account", {
                screen: route.name,
              })
            }
            style={{ marginBottom: rMS(16), backgroundColor: Colors.red }}
            className=" px-2 rounded-xl">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: rMS(8),
              }}>
              <View className="flex-row items-center justify-center space-x-2">
                <View className=" px-1.5 py-1.5 rounded-full bg-white">
                  <MaterialIcons name="delete" size={18} color={Colors.red} />
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.white,
                    fontWeight: "bold",
                  }}>
                  Delete Account
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={rMS(24)}
                color={Colors.white}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SettingsScreen;
