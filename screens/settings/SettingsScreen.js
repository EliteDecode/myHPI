import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../helpers/Colors";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View className="flex-1 bg-white p-4">
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Change Password", {
              screen: route.name,
            })
          }
          style={{ marginBottom: 16, backgroundColor: Colors.primary }}
          className=" py-1 px-2 rounded-xl">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}>
            <View className="flex-row items-center justify-center space-x-2">
              <View className=" px-1.5 py-1 rounded-full bg-white">
                <MaterialCommunityIcons
                  name="lock"
                  size={26}
                  color={Colors.primary}
                />
              </View>

              <Text
                style={{
                  fontSize: 16,
                  color: Colors.white,
                  fontWeight: "bold",
                }}>
                Change Password
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Delete Account", {
              screen: route.name,
            })
          }
          style={{ marginBottom: 16, backgroundColor: Colors.red }}
          className=" py-1 px-2 rounded-xl">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
            }}>
            <View className="flex-row items-center justify-center space-x-2">
              <View className=" px-1.5 py-1 rounded-full bg-white">
                <MaterialIcons name="delete" size={26} color={Colors.red} />
              </View>

              <Text
                style={{
                  fontSize: 16,
                  color: Colors.white,
                  fontWeight: "bold",
                }}>
                Delete Account
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
