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
import { complaintSchema } from "../../utils/schemas";
import { useDispatch, useSelector } from "react-redux";
import {
  new_complaint,
  reset,
} from "../../store/reducers/complaint/complaintSlice";
import { CommonActions, useNavigation } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";
const { compile } = require("html-to-text");
import ConfirmComplaintModal from "./ConfirmComplaintModal";
import { generatePlainHtmlContent } from "../../utils/htmlcontent";
import * as Clipboard from "expo-clipboard";

const NewComplaintScreen = ({ route }) => {
  const { complaint, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.complaint
  );
  const { user } = useSelector((state) => state.auth);
  const { form } = useSelector((state) => state.form);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const saveComplaint = (values) => {
    Alert.alert(
      "Would you prefer to duplicate your file or share it via email?",
      "Please select your preferred option.",
      [
        {
          text: "Copy File",
          onPress: async () => {
            const data = generatePlainHtmlContent(user.data, form, values);

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
          text: "Send File",
          onPress: async () => {
            dispatch(new_complaint(values));
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Ask me later pressed"),
        },
      ]
    );
  };

  useEffect(() => {
    if (
      isSuccess &&
      message === "Congratulations your complaint has been submitted"
    ) {
      Alert.alert(
        "Information",
        "Congratulations your complaint have been sent",
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

    if (isError && message) {
      Toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
    }

    if (isError && message) {
      dispatch(reset());
    }
  }, [isError, isLoading, isSuccess, message, complaint]);
  const { openControlPanel } = route.params;

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />
      <ToastManager
        textStyle={{ fontSize: 12 }}
        height={50}
        position="top"
        width={400}
      />
      <BackButton color={Colors.primary} content="My Concern" />

      <View
        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className="py-2">
          <Formik
            validationSchema={complaintSchema}
            initialValues={{
              bodyPart: "",
              duration: "",
              quality: "",
              severity: 5, // Default to moderate
              timing: "",
              modifyingFactors: "",
              associatedSymptoms: "",
              context: "",
              recipientEmail: "",
            }}
            onSubmit={(values) => saveComplaint(values)}>
            {({
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Body Part:</Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700">
                    <Text className="text-red-700">(*)</Text> Enter the body
                    part associated with your concern
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.bodyPart}
                    placeholderStyle={styles.placeholderStyle}
                    showSoftInputOnFocus
                    placeholder="e.g. Head"
                    onChangeText={handleChange("bodyPart")}
                  />
                  {touched.bodyPart && errors.bodyPart && (
                    <Text style={styles.errorText}>{errors.bodyPart}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Duration:</Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700">
                    <Text className="text-red-700">(*)</Text> Provide number of
                    days/weeks/month
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.duration}
                    placeholder="e.g. 2 weeks"
                    onChangeText={handleChange("duration")}
                  />
                  {touched.duration && errors.duration && (
                    <Text style={styles.errorText}>{errors.duration}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Quality:</Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700 leading-4">
                    <Text className="text-red-700">(*)</Text> Describe the
                    sensation associated with the problem such as:
                    sharp/dull/burning/radiating/stabbing/aching/throbbing
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.quality}
                    placeholder="e.g. Dull Pain"
                    onChangeText={handleChange("quality")}
                  />
                  {touched.quality && errors.quality && (
                    <Text style={styles.errorText}>{errors.quality}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Severity:</Text>
                  <Slider
                    style={{ width: "100%", height: 20 }}
                    minimumTrackTintColor={Colors.primary}
                    maximumTrackTintColor="#000000"
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    value={values.severity}
                    onValueChange={(value) => setFieldValue("severity", value)}
                  />
                  <Text className="">
                    Status:{" "}
                    <Text
                      className={`${
                        values.severity.toFixed(0) < 3
                          ? "text-teal-700 font-bold"
                          : values.severity.toFixed(0) > 7
                          ? "text-red-700 font-bold"
                          : "text-blue-700 font-bold"
                      }`}>
                      {" "}
                      {values.severity.toFixed(0) < 3
                        ? `Low (${values.severity.toFixed(0)})`
                        : values.severity.toFixed(0) > 7
                        ? `High (${values.severity.toFixed(0)})`
                        : `Medium (${values.severity.toFixed(0)})`}
                    </Text>
                  </Text>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Timing:</Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700 leading-4">
                    <Text className="text-red-700">(*)</Text> When does the pain
                    occur? e.g. Daily/weekly
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.timing}
                    placeholder="e.g. During cold weather
                    "
                    onChangeText={handleChange("timing")}
                  />
                  {touched.timing && errors.timing && (
                    <Text style={styles.errorText}>{errors.timing}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Modifying Factors:</Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700 leading-4">
                    <Text className="text-red-700">(*)</Text> What makes the
                    pain better or worse?
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.modifyingFactors}
                    placeholder="e.g. Relaxation
                    "
                    onChangeText={handleChange("modifyingFactors")}
                  />
                  {touched.modifyingFactors && errors.modifyingFactors && (
                    <Text style={styles.errorText}>
                      {errors.modifyingFactors}
                    </Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>
                    Associated Signs and Symptoms:
                  </Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700 leading-4">
                    <Text className="text-red-700">(*)</Text> Provide other
                    symptoms that occur in combination with the main symptom.
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    placeholder="e.g. Cough and Catarrh"
                    value={values.associatedSymptoms}
                    onChangeText={handleChange("associatedSymptoms")}
                  />
                  {touched.associatedSymptoms && errors.associatedSymptoms && (
                    <Text style={styles.errorText}>
                      {errors.associatedSymptoms}
                    </Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Additional Information:</Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700 leading-4">
                    <Text className="text-red-700">(*)</Text> Enter Context
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.context}
                    placeholder="e.g. Pain started yesterday"
                    onChangeText={handleChange("context")}
                  />
                  {touched.context && errors.context && (
                    <Text style={styles.errorText}>{errors.context}</Text>
                  )}
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Recipient Email:</Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700 leading-4">
                    <Text className="text-red-700">(*)</Text> Please enter
                    recipient email.
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.recipientEmail}
                    placeholder="e.g. johndoe@gmail.com"
                    onChangeText={handleChange("recipientEmail")}
                  />
                  {touched.recipientEmail && errors.recipientEmail && (
                    <Text style={styles.errorText}>
                      {errors.recipientEmail}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={
                    isLoading
                      ? () => {
                          console.log("");
                        }
                      : handleSubmit
                  }
                  style={{ marginBottom: 10, marginTop: 10 }}>
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
                        "Submit Complaint"
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <View style={{ marginBottom: 400 }} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = {
  formGroup: {
    marginBottom: 20,
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

export default NewComplaintScreen;
