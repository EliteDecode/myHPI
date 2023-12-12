import React from "react";
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

const NewComplaintScreen = () => {
  const saveComplaint = (values) => {
    // Implement logic to save the complaint data
    console.log("Complaint data saved:", values);
  };

  return (
    <>
      <BackButton color={Colors.primary} />
      <View
        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className="py-2">
          <Formik
            initialValues={{
              location: "",
              duration: "",
              quality: "",
              severity: 5, // Default to moderate
              timing: "",
              modifyingFactors: "",
              associatedSymptoms: "",
              context: "",
            }}
            onSubmit={(values) => saveComplaint(values)}>
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Location:</Text>
                  <TextInput
                    style={styles.input}
                    numberOfLines={3}
                    value={values.location}
                    placeholder="Enter your location"
                    onChangeText={handleChange("location")}
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
                        ? "Low"
                        : values.severity.toFixed(0) > 7
                        ? "High"
                        : "Medium"}
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
                  <Text style={styles.label}>Context:</Text>
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
                      fontFamily: "ca",
                    }}>
                    Submit Complaint
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
    fontFamily: "ca",
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

export default NewComplaintScreen;
