import React, { useRef, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/base";
import Drawer from "react-native-drawer";
import Colors from "../helpers/Colors";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ControlPanel from "./ControPanel";
import IntakeFormScreen from "../screens/IntakeForm/IntakeFormScreen";
import MyStatusBar from "../helpers/MyStatusBar";
import ActiveMedicalProblemsScreens from "../screens/IntakeForm/ActiveMedicalProblemsScreens";
import PastMedicalHistory from "../screens/IntakeForm/PastMedicalHistory";
import SexualTransmittedDiseaseHistory from "../screens/IntakeForm/SexualTransmittedDiseaseHistory";
import GynecologicalHistory from "../screens/IntakeForm/GynecologicalHistory";
import SurgicalHistory from "../screens/IntakeForm/SurgicalHistory";
import FamilyHistory from "../screens/IntakeForm/FamilyHistory";
import SocialHistory from "../screens/IntakeForm/SocialHistory";
import Allergies from "../screens/IntakeForm/Allergies";
import Medications from "../screens/IntakeForm/Medications";
import Immunizations from "../screens/IntakeForm/Immunizations";
import TravelHistory from "../screens/IntakeForm/TravelHistory";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import UpdateProfileScreen from "../screens/Profile/UpdateProfileScreen";
import NewComplaintScreen from "../screens/ComplaintScreen/NewComplaintScreen";
import ComplaintsScreen from "../screens/ComplaintScreen/ComplaintsScreen";
import PreviousComplaintsScreen from "../screens/ComplaintScreen/PreviousCompliantsScreen";
import AppointmentScreen from "../screens/AppointmentsScreen/AppointmentScreen";
import NewAppointments from "../screens/AppointmentsScreen/NewAppointments";
import PreviousAppointmentsScreen from "../screens/AppointmentsScreen/PreviousAppointmentsScreen";
import ChangeEmailScreen from "../screens/settings/ChangeEmailScreen";
import ConfirmEmailChangeScreen from "../screens/settings/ConfirmEmailChangeScreen";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";
import DeleteAccountScreen from "../screens/settings/DeleteAccountScreen";
import { useNavigation } from "@react-navigation/native";
import AskKemiScreen from "../screens/Kemi/AskKemiScreen";

const Tab = createBottomTabNavigator();

const drawerStyles = {
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};

const BottomTab = () => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  const closeControlPanel = () => {
    drawerRef.current.close();
  };

  const openControlPanel = () => {
    drawerRef.current.open();
  };

  const navigation = useNavigation();
  return (
    <>
      <Drawer
        type="overlay"
        content={<ControlPanel closeControlPanel={closeControlPanel} />}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        ref={drawerRef}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 },
        })}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
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
              <View style={{ alignItems: "center", marginTop: 25 }}>
                <Feather name="menu" size={30} color={Colors.primary} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              activeOpacity={0.6}
              style={{
                flexDirection: "row",
                position: "relative",
                marginTop: 25,
              }}>
              <Avatar
                size={30}
                rounded
                title="AB"
                containerStyle={{ backgroundColor: Colors.primary }}
              />
            </TouchableOpacity>
          </View>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: Colors.primary,
              tabBarInactiveTintColor: Colors.gray2,

              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Complaints") {
                  iconName = focused ? "alert-circle" : "alert-circle-outline";
                } else if (route.name === "Appointments") {
                  iconName = focused ? "calendar" : "calendar-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "settings" : "settings-outline";
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
            })}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Complaints"
              component={ComplaintsScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Appointments"
              component={AppointmentScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ headerShown: false }}
            />

            <Tab.Screen
              name="Change Email"
              component={ChangeEmailScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Confirm Email"
              component={ConfirmEmailChangeScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
            />

            <Tab.Screen
              name="Change Password"
              component={ChangePasswordScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
            />

            <Tab.Screen
              name="Ask Kemi"
              component={AskKemiScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
            />

            <Tab.Screen
              name="Delete Account"
              component={DeleteAccountScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
            />

            <Tab.Screen
              name="New Complaint"
              component={NewComplaintScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
            />
            <Tab.Screen
              name="New Appointment"
              component={NewAppointments}
              options={{ headerShown: false, tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Previous Complaints"
              component={PreviousComplaintsScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Previous Appointments"
              component={PreviousAppointmentsScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
            />
            <Tab.Screen
              name="IntakeForm"
              component={IntakeFormScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Active Medical Problems"
              component={ActiveMedicalProblemsScreens}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Past Medical History"
              component={PastMedicalHistory}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Sexual Transmitted Disease History"
              component={SexualTransmittedDiseaseHistory}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Obstetric / Gynecological History"
              component={GynecologicalHistory}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Surgical History"
              component={SurgicalHistory}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Family History"
              component={FamilyHistory}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Social History"
              component={SocialHistory}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Allergies"
              component={Allergies}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Medications"
              component={Medications}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Immunizations"
              component={Immunizations}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Travel History"
              component={TravelHistory}
              options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ tabBarButton: () => null, headerShown: false }}
            />
            <Tab.Screen
              name="UpdateProfile"
              component={UpdateProfileScreen}
              options={{ tabBarButton: () => null, headerShown: false }}
            />
          </Tab.Navigator>
        </View>
      </Drawer>
    </>
  );
};

export default BottomTab;
