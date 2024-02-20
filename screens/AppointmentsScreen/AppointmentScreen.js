import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../helpers/Colors";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import NavigationBar from "../../components/NavigationBar";

const AppointmentScreen = ({ route }) => {
  const navigation = useNavigation();

  const { openControlPanel } = route.params;

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />
      <View className="flex-1 bg-white p-4">
        <Text className="my-3 text-sm opacity-80">
          Disclaimer: Please note that the booking process is facilitated
          through Calendly. By clicking the "Book a New Appointment" button, you
          will be redirected to Calendly to complete the booking. Any
          information provided during the booking process is subject to
          Calendly's terms and privacy policy.
        </Text>

        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("New Appointment", {
                screen: route.name,
              })
            }
            style={{ marginBottom: 16, backgroundColor: Colors.primary }}
            className="px-2 rounded-xl">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
              }}>
              <View className="flex-row items-center justify-center space-x-2">
                <View className="px-1 py-1 rounded-full bg-white">
                  <Ionicons name="calendar" size={26} color={Colors.primary} />
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.white,
                    fontWeight: "bold",
                  }}>
                  Book a New Appointment
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={Colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AppointmentScreen;
