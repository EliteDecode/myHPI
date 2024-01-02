import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import Slider from "@react-native-community/slider";
import Colors from "../../helpers/Colors";
import BackButton from "../../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditComplaintScreen = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      location: "Head",
      duration: "2 days",
      quality: "Sharp",
      severity: 7,
      timing: "Morning",
      modifyingFactors: "Rest",
      associatedSymptoms: "Nausea",
      context: "At work",
    },
    {
      id: 2,
      location: "Back",
      duration: "1 week",
      quality: "Dull",
      severity: 5,
      timing: "Afternoon",
      modifyingFactors: "Movement",
      associatedSymptoms: "None",
      context: "At home",
    },

    {
      id: 3,
      location: "Abdomen",
      duration: "3 days",
      quality: "Cramping",
      severity: 8,
      timing: "Evening",
      modifyingFactors: "Medication",
      associatedSymptoms: "Bloating",
      context: "During meals",
    },
  ]);

  const route = useRoute();
  const navigation = useNavigation();

  const complaint = complaints.find(
    (item) => item.id === route.params.complaintId
  );

  return (
    <>
      <BackButton color={Colors.primary} content="Edit Previous Concern" />
      <View
        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className="py-2">
          <Formik
            initialValues={{
              bodyPart: complaint.location,
              duration: complaint.duration,
              quality: complaint.quality,
              severity: complaint.severity, // Default to moderate
              timing: complaint.timing,
              modifyingFactors: complaint.modifyingFactors,
              associatedSymptoms: complaint.associatedSymptoms,
              context: complaint.context,
            }}
            onSubmit={(values) => saveComplaint(values)}>
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Body Part:</Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    editable={false}
                    value={values.bodyPart}
                    placeholder="Enter your bodyPart"
                    onChangeText={handleChange("bodyPart")}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Duration:</Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.duration}
                    placeholder="Enter Duration"
                    onChangeText={handleChange("duration")}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Quality:</Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
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
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.timing}
                    placeholder="Enter Timing"
                    onChangeText={handleChange("timing")}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Modifying Factors:</Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.modifyingFactors}
                    placeholder="Enter Modifying Factors"
                    onChangeText={handleChange("modifyingFactors")}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>
                    Associated Signs and Symptoms:
                  </Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    placeholder="Enter Associated Signs and Symptoms"
                    value={values.associatedSymptoms}
                    onChangeText={handleChange("associatedSymptoms")}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Additional Information:</Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.context}
                    placeholder="Enter Context"
                    onChangeText={handleChange("context")}
                  />
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 16,
                    }}>
                    Edit Complaint
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <View style={{ marginBottom: 100 }} />
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
