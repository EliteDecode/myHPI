import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  Button,
  Modal,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import React from "react";
import Colors from "../../helpers/Colors";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import MyStatusBar from "../../helpers/MyStatusBar";
const { width, height } = Dimensions.get("window");
import * as Clipboard from "expo-clipboard";
import { CopilotStep, walkthroughable, useCopilot } from "react-native-copilot";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../store/reducers/auth/authSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import NavigationBar from "../../components/NavigationBar";
import {
  fetchFormData,
  get_form,
} from "../../store/reducers/intakeForm/intakeFormSlice";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import {
  generateHtmlContent,
  generateHtmlContent1,
  generatePlainHtmlContent,
  generatePlainHtmlContent2,
} from "../../utils/htmlcontent";
import { get_complaint } from "../../store/reducers/complaint/complaintSlice";
const { compile } = require("html-to-text");

const CopilotText = walkthroughable(Text);
const CopilotView = walkthroughable(View);

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [lastLoginTime, setLastLoginTime] = useState();
  const { start, copilotEvents } = useCopilot();
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { form } = useSelector((state) => state.form);
  const { complaint, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.complaint
  );

  const { openControlPanel } = route.params;

  const handleAddComplaint = () => {
    if (!form) {
      Alert.alert(
        "Info",
        "Please update your history of medical illness before making a complaints",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Ask me later pressed"),
          },
          {
            text: "Update Medical History",
            onPress: async () => {
              navigation.navigate("IntakeForm", {
                screen: route.name,
              });
            },
          },
        ]
      );
    } else {
      navigation.navigate("New Complaint", {
        screen: route.name,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchFormData(user?.data?._id));
    dispatch(get_form());
  }, []);

  const getLastLoginTime = async () => {
    const logoutTime = await AsyncStorage.getItem("lastLoginTime");

    if (logoutTime) {
      const formattedDate = new Date(
        parseInt(logoutTime, 10)
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setLastLoginTime(formattedDate);
    }
  };

  useEffect(() => {
    getLastLoginTime();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem("firstLaunchTour");
      if (value === null) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error reading from AsyncStorage:", error);
    }
  };

  const handleAddMedicalHistory = () => {
    if (user?.data?.UpdatedUser) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "IntakeForm" }],
        })
      );
    } else {
      Alert.alert(
        "Information",
        "Please update your profile to update your medical history",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Update Profile", {
                screen: route.name,
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const setFirstGuide = async () => {
    try {
      await AsyncStorage.setItem("firstLaunchTour", "true");
    } catch (error) {
      console.error("Error setting firstLaunchTour in AsyncStorage:", error);
    }
  };

  copilotEvents.on("stop", setFirstGuide);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    start();
  };

  const handleShareHistoryPress = async () => {
    dispatch(fetchFormData(user?.data?._id));
    Alert.alert(
      "Info",
      "Upload medical history to portal or email it by clicking below.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "Paste Medical History",
          onPress: async () => {
            const data = generatePlainHtmlContent2(user.data, form);
            const options = {
              wordwrap: 130,
            };
            const compiledConvert = compile(options);

            const texts = data.map(compiledConvert);
            const copy = await Clipboard.setStringAsync(texts.join("\n"));
            if (copy) {
              Alert.alert(
                "Information",
                "Congratulations your file have been copied",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      // navigation.navigate("Previous Complaints");
                      // dispatch(reset());
                    },
                  },
                ],
                { cancelable: false }
              );
            }
          },
        },
        {
          text: "Email Medical History",
          onPress: async () => {
            try {
              const html = generateHtmlContent1(user.data, form);
              const { uri } = await Print.printToFileAsync({ html });
              Sharing.shareAsync(uri);
            } catch (error) {
              console.error("Error sharing:", error.message);
            }
          },
        },
      ]
    );
  };

  const handleAskKeMiPress = () => {
    navigation.navigate("Ask KeMi", {
      screen: route.name,
    });
  };

  return (
    <>
      <MyStatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
      <NavigationBar openControlPanel={openControlPanel} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View className="bg-white p-5 rounded-md">
            <Text className="my-2" style={{}}>
              Start your tour guide{" "}
            </Text>
            <Button title="Start" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <SafeAreaView className="bg-white flex-1 ">
        <ScrollView>
          <View className="p-7  space-y-2">
            <View className="flex-row items-center">
              <Text className="text-[23px] font-bold">
                Hi,{` ${user?.data?.Firstname}`}{" "}
              </Text>
              {user?.data?.UpdatedUser ? (
                <MaterialIcons
                  name="verified"
                  size={20}
                  color={Colors.primary}
                />
              ) : (
                <Octicons name="unverified" size={20} color="red" />
              )}
            </View>
            {!user?.data?.UpdatedUser && (
              <Text>
                Please update your profile to add your medical history.
              </Text>
            )}
            <Text style={{ fontFamily: "sen" }}>
              What's new with your health today?
            </Text>
          </View>
          <View>
            <Image
              alt="welcome image"
              source={require("../../assets/images/homeImg.png")}
              style={{
                resizeMode: "contain",
                width: width,
                height: Platform.OS === "ios" ? height * 0.35 : height * 0.323,
              }}
            />
          </View>
          <View className=" mt-1 rounded-full flex flex-col items-center justify-center">
            <CopilotStep order={2} text="Add new complaints" name="form">
              <CopilotView className="">
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={handleAddComplaint}
                  className="px-3 py-3 m-2 rounded-lg shadow-lg flex flex-row space-x-4 items-center justify-center mt-2"
                  style={{
                    backgroundColor: Colors.primary,
                    width: width * 0.75,
                  }}>
                  <Text
                    className="text-white font-bold"
                    style={{ fontSize: 18 }}>
                    {" "}
                    Add new complaint
                  </Text>
                  <FontAwesome name="wpforms" size={20} color="#fff" />
                </TouchableOpacity>
              </CopilotView>
            </CopilotStep>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={[styles.box, { backgroundColor: "#EAEAEA" }]}
              onPress={handleShareHistoryPress}>
              <Image
                source={require("../../assets/images/data-sharing.png")}
                style={styles.image}
              />
              <CopilotStep
                text="You can share your records"
                order={3}
                name="share">
                <CopilotText style={styles.text}>Share Records</CopilotText>
              </CopilotStep>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.box, { backgroundColor: "#EAEAEA" }]}
              onPress={handleAskKeMiPress}>
              <Image
                source={require("../../assets/images/confusion.png")}
                style={styles.image}
              />
              <CopilotStep
                text="You can ask your assitstant KEMI, Coming soon."
                order={4}
                name="kemi">
                <CopilotText style={styles.text}>Ask KeMi</CopilotText>
              </CopilotStep>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.box, { backgroundColor: "#EAEAEA" }]}
              onPress={handleAddMedicalHistory}>
              <Image
                source={require("../../assets/images/profile.png")}
                style={styles.image}
              />
              <CopilotStep
                text="Please update your medical history"
                order={1}
                name="profile">
                <CopilotText style={styles.text}>Medical History </CopilotText>
              </CopilotStep>
            </TouchableOpacity>
          </View>
          <View
            style={{ marginBottom: Platform.OS === "ios" ? 300 : 200 }}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
    position: "relative",
  },
  box: {
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 20,
    width: "32%",
  },
  image: {
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain",
  },
  text: {
    fontSize: 11,
    fontFamily: "sen",
    position: "absolute",
    bottom: 2,
    marginBottom: 5,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
