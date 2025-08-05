import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Feather, Ionicons } from "@expo/vector-icons";
import CustomAvatar from "./CustomAvatar";
import Colors from "../helpers/Colors";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ControlPanelModal from "./ControlPanelModal";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import AskKeMiScreen from "../screens/Kemi/AskKemiScreen";
import EditComplaintScreen from "../screens/ComplaintScreen/EditComplaintScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../store/reducers/auth/authSlice";
import {
  fetchFormData,
  get_form,
} from "../store/reducers/intakeForm/intakeFormSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AskKemiMedProblemScreen from "../screens/Kemi/AskKemiMedProblemScreen";
import AskKemiDrugInfoScreen from "../screens/Kemi/AskKemiDrugInfoScreen";
import AskKemiLabTestScreen from "../screens/Kemi/AskKemiLabTestScreen";
import AskKemiMedProcedureScreen from "../screens/Kemi/AskKemiMedProcedureScreen";
import PreviewComplaintScreen from "../screens/ComplaintScreen/PreviewComplaintScreen";
import MedsRequest from "../screens/ComplaintScreen/MedsRequest";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { user } = useSelector((state) => state.auth);
  const { form, isSuccess } = useSelector((state) => state.form);
  const loggedInUserId = user?.data?._id;
  const [controlPanelVisible, setControlPanelVisible] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchFormData(user?.data?._id));
    // dispatch(get_form());
  }, []);

  const openControlPanel = () => {
    setControlPanelVisible(true);
  };

  const closeControlPanel = () => {
    setControlPanelVisible(false);
  };

  return (
    <>
      <ControlPanelModal
        visible={controlPanelVisible}
        onClose={closeControlPanel}
      />
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
            initialParams={{
              openControlPanel: openControlPanel,
            }}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Complaints"
            component={ComplaintsScreen}
            options={{ headerShown: false }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="Appointments"
            component={AppointmentScreen}
            options={{ headerShown: false }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />

          <Tab.Screen
            name="Change Email"
            component={ChangeEmailScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="Confirm Email"
            component={ConfirmEmailChangeScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />

          <Tab.Screen
            name="Change Password"
            component={ChangePasswordScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />

          <Tab.Screen
            name="Ask KeMi"
            component={AskKeMiScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />

          <Tab.Screen
            name="Medical Diagnosis (Problems)"
            component={AskKemiMedProblemScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="Drug Info Request"
            component={AskKemiDrugInfoScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="Lab Test Request"
            component={AskKemiLabTestScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />

          <Tab.Screen
            name="Medical Procedure Request"
            component={AskKemiMedProcedureScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />

          <Tab.Screen
            name="Delete Account"
            component={DeleteAccountScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />

          <Tab.Screen
            name="New Complaint"
            component={NewComplaintScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="Preview Complaint"
            component={PreviewComplaintScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="New Appointment"
            component={NewAppointments}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          {/* <Tab.Screen
              name="Meds Request"
              component={MedsRequest}
              options={{ headerShown: false, tabBarButton: () => null }}
              initialParams={{
                openControlPanel: openControlPanel,
              }}
            /> */}
          <Tab.Screen
            name="Previous Complaints"
            component={PreviousComplaintsScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="Edit Complaints"
            component={EditComplaintScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="Previous Appointments"
            component={PreviousAppointmentsScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="IntakeForm"
            component={IntakeFormScreen}
            options={{ headerShown: false, tabBarButton: () => null }}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
          />
          <Tab.Screen
            name="Active Medical Problems Form"
            component={ActiveMedicalProblemsScreens}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Past Medical History Form"
            component={PastMedicalHistory}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Sexual Transmitted Disease History Form"
            component={SexualTransmittedDiseaseHistory}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Obstetric / Gynecological History Form"
            component={GynecologicalHistory}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Surgical History Form"
            component={SurgicalHistory}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Family History Form"
            component={FamilyHistory}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Social History Form"
            component={SocialHistory}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Allergies Form"
            component={Allergies}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Medications Form"
            component={Medications}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Immunizations Form"
            component={Immunizations}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Travel History Form"
            component={TravelHistory}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
            options={{ tabBarButton: () => null, headerShown: false }}
          />
          <Tab.Screen
            name="Update Profile"
            component={UpdateProfileScreen}
            initialParams={{
              openControlPanel: openControlPanel,
            }}
            options={{ tabBarButton: () => null, headerShown: false }}
          />
        </Tab.Navigator>
      </View>
    </>
  );
};

export default BottomTab;
