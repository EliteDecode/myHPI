import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  TextInput,
} from "react-native";
import { Formik } from "formik";

import Slider from "@react-native-community/slider";

import Colors from "../../helpers/Colors";
import BackButton from "../../components/BackButton";
import NavigationBar from "../../components/NavigationBar";
import * as yup from "yup"; // Import yup
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  new_complaint,
  reset,
} from "../../store/reducers/complaint/complaintSlice";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Toast from "../../utils/toast";
const { compile } = require("html-to-text");
import ConfirmComplaintModal from "./ConfirmComplaintModal";
import { generatePlainHtmlContent } from "../../utils/htmlcontent";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rS, rVS } from "../../styles/responsiveness";

const PreviewComplaintScreen = ({ route }) => {
  const { complaint, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.complaint
  );
  const { user } = useSelector((state) => state.auth);
  const { form } = useSelector((state) => state.form);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState();
  const [copy, setCopy] = useState(null);
  const [send, setSend] = useState(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      isSuccess &&
      message === "Congratulations your complaint has been sent" &&
      copy === false
    ) {
      Alert.alert(
        "Information",
        "Congratulations your complaint has been sent",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Previous Complaints");
              route?.params?.resetForm();

              dispatch(reset());
            },
          },
        ],
        { cancelable: false }
      );
    }
    if (
      isSuccess &&
      message === "Congratulations your complaint has been sent" &&
      copy === true
    ) {
      Alert.alert(
        "Information",
        "Congratulations your complaint have been copied and saved",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Previous Complaints");
              route?.params?.resetForm();
              dispatch(reset());
            },
          },
        ],
        { cancelable: false }
      );
    }

    if (isError && message) {
      Toast.error(message);
      setCopy(null);
      setSend(null);
    }

    if (isSuccess) {
      dispatch(reset());
    }

    if (isError && message) {
      dispatch(reset());
      setCopy(null);
      setSend(null);
    }
  }, [isError, isLoading, isSuccess, message, complaint]);
  const { openControlPanel } = route.params;

  const handleSubmit = async () => {
    if (email === "") {
      setErrorEmail("Email cannot be empty");
    } else if (!email.includes("@")) {
      setErrorEmail("Invalid Email Entered");
    } else {
      setErrorEmail("");
      const data = {
        ...route?.params?.complaint,
        recipientEmail: email.trim(),
      };
      Alert.alert(
        `Email Medical History to ${email}`,
        "Do you want to proceed?",
        [
          {
            text: "Proceed",
            onPress: async () => {
              setCopy(false);
              setSend(true);

              dispatch(new_complaint(data));
            },
          },
          {
            text: "Cancel",
            onPress: () => {},
          },
        ]
      );
    }
  };

  const handleCopy = () => {
    const dataForm = {
      ...route?.params?.complaint,
      recipientEmail: "",
    };

    ("");

    Alert.alert(
      `Paste Medical History to Patient Portal`,
      "Do you want to proceed?",
      [
        {
          text: "Proceed",
          onPress: async () => {
            const data = generatePlainHtmlContent(user?.data, form, dataForm);
            const options = {
              wordwrap: 130,
            };
            const compiledConvert = compile(options);
            const texts = data.map(compiledConvert);
            const copy = await Clipboard.setStringAsync(texts.join("\n"));
            if (copy) {
              setEmail("");
              setCopy(true);
              setSend(false);
              dispatch(new_complaint(dataForm));
            }
          },
        },

        {
          text: "Cancel",
          onPress: () => {},
        },
      ]
    );
  };

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("New Complaint")}
          className=" py-2 flex-row space-x-2 items-center bg-white">
          <Ionicons
            name="arrow-back"
            size={27}
            color={Colors.primary}
            style={{ marginLeft: 16 }}
          />
          <Text className="text-[16px]">Edit Complaints</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{ flex: 1, backgroundColor: "#f7f7f7", paddingHorizontal: 16 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className="py-2">
          <View className=" p-3 shadow-sm rounded-md bg-white">
            <View className="  py-2  border-b border-gray-200">
              <Text className="text-[16px]">
                Body part associated with your concern:
              </Text>
              <Text className="text-[16px] font-bold">
                {route?.params?.complaint?.bodyPart}
              </Text>
            </View>
            <View className="  py-2  border-b border-gray-200">
              <Text className="text-[16px]">Number of days/weeks/month:</Text>
              <Text className="text-[16px] font-bold">
                {route?.params?.complaint?.duration}
              </Text>
            </View>
            <View className=" py-2  border-b border-gray-200">
              <Text className="text-[16px]">
                The sensation associated with the problem such as:
              </Text>
              <Text className="text-[16px] font-bold">
                {route?.params?.complaint?.quality}
              </Text>
            </View>
            <View className=" py-2  border-b border-gray-200">
              <Text className="text-[16px]">Severity:</Text>
              <Text className="text-[16px] font-bold">
                {route?.params?.complaint?.severity}/10
              </Text>
            </View>
            <View className=" py-2  border-b border-gray-200">
              <Text className="text-[16px]">When does the pain occur:</Text>
              <Text className="text-[16px] font-bold">
                {route?.params?.complaint?.timing}
              </Text>
            </View>
            <View className=" py-2  border-b border-gray-200">
              <Text className="text-[16px]">
                Modifying Factor(what eases the pain):
              </Text>
              <Text className="text-[16px] font-bold">
                {route?.params?.complaint?.modifyingFactors}
              </Text>
            </View>
            <View className=" py-2  border-b border-gray-200">
              <Text className="text-[16px]">
                Modifying Factors(what makes the pain worse):
              </Text>
              <Text className="text-[16px] font-bold">
                {route?.params?.complaint?.modifyingFactorsWorse}
              </Text>
            </View>
            <View className=" py-2  border-b border-gray-200">
              <Text className="text-[16px]">
                Symptoms that occur in combination with the main symptom:
              </Text>
              <Text className="text-[16px] font-bold">
                {route?.params?.complaint?.associatedSymptoms}
              </Text>
            </View>
            <View className=" py-2  border-b border-gray-200">
              <Text className="text-[16px]">Additional Information:</Text>
              <Text className="text-[16px] font-bold">
                {route?.params?.complaint?.context}
              </Text>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Recipient Email:</Text>
              <Text className="mt-1 mb-2 text-[12px] text-gray-700 leading-4">
                <Text className="text-red-700">(*)</Text> Please enter recipient
                email, if you are sending this complaint to your medical team
              </Text>
              <TextInput
                style={styles.input}
                numberOfLines={3}
                value={email}
                placeholder="e.g. johndoe@gmail.com"
                onChangeText={(text) => setEmail(text)}
              />

              {errorEmail && <Text style={styles.errorText}>{errorEmail}</Text>}
            </View>
            <View className="mt-5 grid grid-cols-2 border-t-2 border-gray-200 py-5">
              {!copy && (
                <TouchableOpacity
                  onPress={isLoading && email ? () => {} : handleSubmit}
                  style={{
                    marginBottom: 10,
                    marginTop: 10,
                    width: send ? "100%" : "100%",
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.dark,
                      borderRadius: 30,
                      paddingVertical: 18,
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        "Send Complaint Now"
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {!send && (
                <TouchableOpacity
                  onPress={isLoading ? () => {} : handleCopy}
                  style={{
                    marginBottom: 10,
                    marginTop: 10,
                    width: copy ? "100%" : "100%",
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      borderRadius: 30,
                      paddingVertical: 18,
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        "Paste complaints to portal"
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ marginBottom: 400 }} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = {
  formGroup: {
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 4,
    color: Colors.dark,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,

    height: Platform.OS === "ios" ? 50 : 56,
  },
  submitButton: {
    backgroundColor: "#478AFB",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  placeholderStyle: { fontSize: 10, color: "red" },
};

export default PreviewComplaintScreen;
