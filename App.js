import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { useFonts } from "expo-font";
import RegisterScreen from "./screens/RegisterScreen";
import ConfirmPasswordScreen from "./screens/ConfirmPasswordScreen/ConfirmPasswordScreen";
import BottomTab from "./components/BottomTab";

import { CopilotProvider } from "react-native-copilot";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";

const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    ca: require("./assets/fonts/Calistoga-Regular.ttf"),
    sen: require("./assets/fonts/Sen-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    // Font is still loading, return a loading indicator or splash screen
    return null;
  }

  return (
    <CopilotProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false, headerStatusBarHeight: 0 }}
          />

          <Stack.Screen
            name="Main" // Main stack for screens with bottom tab
            component={BottomTab}
            options={{
              headerShadowVisible: false,
              headerShown: false,
              headerStatusBarHeight: 0,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              headerTitle: "", // Hide the title
              headerBackVisible: true, // Hide the back button
            }}
          />
          <Stack.Screen
            name="Forgot Password"
            component={ForgotPassword}
            options={{
              headerShown: false,
              headerTitle: "", // Hide the title
              headerBackVisible: true, // Hide the back button
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
              headerTitle: "", // Hide the title
              headerBackVisible: true, // Hide the back button
            }}
          />
          <Stack.Screen
            name="ConfirmPassword"
            component={ConfirmPasswordScreen}
            options={{
              headerShown: false,
              headerTitle: "", // Hide the title
              headerBackVisible: true, // Hide the back button
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CopilotProvider>
  );
}

export default App;
