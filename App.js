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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CopilotProvider } from "react-native-copilot";
import { Provider as ReduxProvider } from "react-redux";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import { store } from "./store";
import TemrsAndConditions from "./screens/Terms";

const Stack = createNativeStackNavigator();

function App() {
  const [storeData, setStoreData] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(storeData);
  const [firstLaunch, setFirstLaunch] = React.useState(null);

  React.useLayoutEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("firstLaunch");
      const storeData = await AsyncStorage.getItem("userData");

      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("firstLaunch", "false");
      } else {
        setFirstLaunch(false);
      }

      if (storeData == null) {
        setLoggedIn(false);
        setStoreData(false);
      } else {
        setLoggedIn(true);
        setStoreData(true);
      }
    }
    setData();
  }, []);

  const [fontsLoaded] = useFonts({
    ca: require("./assets/fonts/Calistoga-Regular.ttf"),
    sen: require("./assets/fonts/Sen-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    // Font is still loading, return a loading indicator or splash screen
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <CopilotProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {firstLaunch && (
              <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ headerShown: false }}
              />
            )}
            {!loggedIn && (
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false, headerStatusBarHeight: 0 }}
              />
            )}
            <Stack.Screen
              name="Main"
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
              name="Terms and Conditions"
              component={TemrsAndConditions}
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
    </ReduxProvider>
  );
}

export default App;
