import { CommonActions, useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { useCopilot } from "react-native-copilot";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFormData,
  get_form,
} from "../store/reducers/intakeForm/intakeFormSlice";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import {
  generateHtmlContent1,
  generatePlainHtmlContent2,
} from "../utils/htmlcontent";
import { Alert } from "react-native";

const useHomeOperations = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { start, copilotEvents } = useCopilot();
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { form } = useSelector((state) => state.form);
  const { openControlPanel } = route.params;

  useEffect(() => {
    dispatch(fetchFormData(user?.data?._id));
    dispatch(get_form());
  }, []);

  useEffect(() => {
    copilotEvents.on("stop", setFirstGuide);
    return () => {
      copilotEvents.off("stop", setFirstGuide);
    };
  }, [copilotEvents]);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const handleAddComplaint = () => {
    if (!form) {
      Alert.alert(
        "Info",
        "Please update your history of medical illness before making a complaint",
        [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Update Medical History",
            onPress: () =>
              navigation.navigate("IntakeForm", { screen: route.name }),
          },
        ]
      );
    } else {
      navigation.navigate("New Complaint", { screen: route.name });
    }
  };

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem("firstLaunchTour");

      setModalVisible(value === null);
    } catch (error) {
      console.error("Error reading from AsyncStorage:", error);
    }
  };

  const setFirstGuide = async () => {
    try {
      await AsyncStorage.setItem("firstLaunchTour", "true");
    } catch (error) {
      console.error("Error setting firstLaunchTour in AsyncStorage:", error);
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
            onPress: () =>
              navigation.navigate("Update Profile", { screen: route.name }),
          },
        ],
        { cancelable: false }
      );
    }
  };

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
        { text: "Cancel", onPress: () => {} },
        {
          text: "Paste Medical History",
          onPress: async () => {
            const data = generatePlainHtmlContent2(user.data, form);
            const options = { wordwrap: 130 };
            const compiledConvert = compile(options);
            const texts = data.map(compiledConvert);
            await Clipboard.setStringAsync(texts.join("\n"));
            Alert.alert(
              "Information",
              "Congratulations your file has been copied",
              [{ text: "OK" }],
              { cancelable: false }
            );
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
    navigation.navigate("Ask KeMi", { screen: route.name });
  };

  return {
    handleAddComplaint,
    handleAddMedicalHistory,
    modalVisible,
    closeModal,
    setFirstGuide,
    handleShareHistoryPress,
    user,
    form,
    handleAskKeMiPress,
    openControlPanel,
  };
};

export default useHomeOperations;
