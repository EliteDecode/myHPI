import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import Slider from "@react-native-community/slider";
import Colors from "../../helpers/Colors";
import BackButton from "../../components/BackButton";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import NavigationBar from "../../components/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import ToastManager, { Toast } from "toastify-react-native";
import {
  new_complaint,
  reset,
} from "../../store/reducers/complaint/complaintSlice";
import { ActivityIndicator } from "react-native";
import * as Clipboard from "expo-clipboard";
import { generatePlainHtmlContent } from "../../utils/htmlcontent";

const EditComplaintScreen = ({ route }) => {
  const {
    complaint: complaints,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.complaint);

  const navigation = useNavigation();
  const { openControlPanel } = route.params;

  const complaint = complaints?.find(
    (item) => item._id === route.params.complaintId
  );

  const saveComplaint = (values, resetForm) => {
    navigation.navigate("Preview Complaint", {
      complaint: values,
      resetForm,
    });
  };

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />
      <ToastManager
        textStyle={{ fontSize: 12 }}
        height={50}
        position="top"
        width={400}
      />
      <BackButton color={Colors.primary} content="Edit Previous Concern" />
      <View
        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className="py-2">
          <Formik
            initialValues={{
              bodyPart: complaint?.bodyPart,
              duration: complaint?.duration,
              quality: complaint?.quality,
              severity: complaint?.severity, // Default to moderate
              timing: complaint?.timing,
              modifyingFactors: complaint?.modifyingFactors,
              modifyingFactorsWorse: complaint?.modifyingFactorsWorse,
              associatedSymptoms: complaint?.associatedSymptoms,
              context: complaint?.context,
            }}
            onSubmit={(values, { resetForm }) =>
              saveComplaint(values, resetForm)
            }>
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Body Part:</Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700">
                    <Text className="text-red-700">(*)</Text> Enter the body
                    part associated with your concern
                  </Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: "#f0f0f0" }]}
                    editable={false}
                    value={values.bodyPart}
                    placeholder="Enter your bodyPart"
                    onChangeText={handleChange("bodyPart")}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Duration:</Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700">
                    <Text className="text-red-700">(*)</Text> Provide number of
                    days/weeks/month
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={values.duration}
                    placeholder="Enter Duration"
                    onChangeText={handleChange("duration")}
                  />
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
                    value={values.quality}
                    placeholder="Enter Quality"
                    onChangeText={handleChange("quality")}
                  />
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
                        values?.severity?.toFixed(0) < 3
                          ? "text-teal-700 font-bold"
                          : values.severity.toFixed(0) > 7
                          ? "text-red-700 font-bold"
                          : "text-blue-700 font-bold"
                      }`}>
                      {" "}
                      {values?.severity?.toFixed(0) < 3
                        ? `Low (${values?.severity?.toFixed(0)})`
                        : values?.severity?.toFixed(0) > 7
                        ? `High (${values?.severity?.toFixed(0)})`
                        : `Medium (${values?.severity?.toFixed(0)})`}
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
                    value={values.timing}
                    placeholder="Enter Timing"
                    onChangeText={handleChange("timing")}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>
                    Modifying Factor(what eases the pain):
                  </Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700 leading-4">
                    <Text className="text-red-700">(*)</Text> What makes the
                    pain better ?
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.modifyingFactors}
                    placeholder="e.g. Relaxation
                    "
                    onChangeText={handleChange("modifyingFactors")}
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>
                    Modifying Factors(what makes the pain worse):
                  </Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700 leading-4">
                    <Text className="text-red-700">(*)</Text> What makes the
                    pain worse?
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.modifyingFactorsWorse}
                    placeholder="e.g. Relaxation
                    "
                    onChangeText={handleChange("modifyingFactorsWorse")}
                  />
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
                    placeholder="Enter Associated Signs and Symptoms"
                    value={values.associatedSymptoms}
                    onChangeText={handleChange("associatedSymptoms")}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Additional Information:</Text>
                  <Text className="mt-1 mb-2 text-[12px] text-gray-700 leading-4">
                    <Text className="text-red-700">(*)</Text> Enter Context
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={values.context}
                    placeholder="Enter Context"
                    onChangeText={handleChange("context")}
                  />
                </View>

                <TouchableOpacity
                  onPress={isLoading ? "" : handleSubmit}
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
                        fontFamily: "sen",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        "Save Complaint"
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
    fontFamily: "sen",
    height: Platform.OS === "ios" ? 50 : 56,
  },
  submitButton: {
    backgroundColor: "#478AFB",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
};

export default EditComplaintScreen;
