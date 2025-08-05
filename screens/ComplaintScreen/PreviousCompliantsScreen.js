import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../helpers/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import NavigationBar from "../../components/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../utils/toast";
import {
  delete_complaint,
  get_complaint,
  reset,
} from "../../store/reducers/complaint/complaintSlice";
import { rS, rVS } from "../../styles/responsiveness";
const { width, height } = Dimensions.get("window");

const PreviousComplaintsScreen = ({ route }) => {
  const navigation = useNavigation();
  const routes = useRoute();
  const { complaint, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.complaint
  );
  const [accordions, setAccordions] = useState([]);

  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const { openControlPanel } = route.params;
  const handleEdit = (id) => {
    // Display an alert to confirm if the user wants to edit
    Alert.alert(
      "Confirm Edit",
      "Are you sure you want to edit this complaint?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Proceed",
          onPress: () => {
            dispatch(reset());
            navigation.dispatch(
              CommonActions.reset({
                index: 0, // Number of screens you want to reset, in this case, 1
                routes: [
                  {
                    name: "Edit Complaints",
                    params: {
                      complaintId: id,
                      screen: routes.name,
                    },
                  },
                ],
              })
            );
          },
        },
      ]
    );
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this complaint?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Proceed",
          onPress: () => {
            dispatch(delete_complaint(id));
          },
        },
      ]
    );
  };

  useEffect(() => {
    dispatch(reset());
    dispatch(get_complaint());
  }, [route?.params]);

  const refresh = () => {
    dispatch(get_complaint());
  };

  useEffect(() => {
    if (complaint) {
      setError(false);
      setAccordions(complaint);
    }

    if (
      complaint &&
      message === "Congratulations this complaint has been deleted"
    ) {
      Toast.success("Congratulations this complaint has been deleted");
      dispatch(reset());
    }

    if (isError && !message.includes("null")) {
      Toast.error(message);
      dispatch(reset());
      setError(true);
    }

    if (isError && message.includes("timeout")) {
      Toast.error("Something went wrong, please refresh");
      dispatch(reset());
      setError(true);
    }
  }, [isError, isLoading, isSuccess, message, complaint]);

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />


      <View className="flex-1 bg-white">
        {isLoading && (
          <View className="px-4 py-3 mb-3 items-center justify-center flex-1">
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}

        {!isLoading && complaint?.length > 0 ? (
          <>
            <BackButton color={Colors.primary} content="Previous Complaints" />

            {complaint?.length > 0 && (
              <ScrollView
                style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
                {accordions &&
                  accordions?.map((complaint) => (
                    <View key={complaint._id} style={styles.accordionContainer}>
                      <TouchableOpacity
                        style={styles.accordionHeader}
                        onPress={() => toggleAccordion(complaint._id)}>
                        <View>
                          <Text style={styles.accordionHeaderText}>
                            {new Date(complaint?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </Text>
                          <Text
                            className="text-[14px]"
                            style={{ color: Colors.gray, fontFamily: "sen" }}>
                            BodyPart: {complaint.bodyPart}
                          </Text>
                        </View>
                        <Icon
                          name={
                            activeAccordion === complaint._id
                              ? "chevron-up"
                              : "chevron-down"
                          }
                          size={24}
                          color={Colors.white}
                        />
                      </TouchableOpacity>
                      <Collapsible
                        collapsed={activeAccordion !== complaint._id}>
                        <View
                          style={styles.accordionContent}
                          className="p-5 space-y-4">
                          <View style={styles.gridContainer}>
                            <View style={styles.gridItemStart}>
                              <Text style={styles.labelText}>Location:</Text>
                              <Text style={styles.detailText}>
                                {complaint.bodyPart}
                              </Text>
                            </View>
                            <View style={styles.gridItemEnd}>
                              <Text style={styles.labelText}>Duration:</Text>
                              <Text style={styles.detailText}>
                                {complaint.duration}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.gridContainer}>
                            <View style={styles.gridItemStart}>
                              <Text style={styles.labelText}>Quality:</Text>
                              <Text style={styles.detailText}>
                                {complaint.quality}
                              </Text>
                            </View>
                            <View style={styles.gridItemEnd}>
                              <Text style={styles.labelText}>Severity:</Text>
                              <Text style={styles.detailText}>
                                {complaint.severity}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.gridContainer}>
                            <View style={styles.gridItemStart}>
                              <Text style={styles.labelText}>Timing:</Text>
                              <Text style={styles.detailText}>
                                {complaint.timing}
                              </Text>
                            </View>
                            <View style={styles.gridItemEnd}>
                              <Text style={styles.labelText}>
                                Modifying Factors(What eases the pain):
                              </Text>
                              <Text style={styles.detailText}>
                                {complaint.modifyingFactors}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.gridContainer}>
                            <View style={styles.gridItemStart}>
                              <Text style={styles.labelText}>Timing:</Text>
                              <Text style={styles.detailText}>
                                {complaint.timing}
                              </Text>
                            </View>
                            <View style={styles.gridItemEnd}>
                              <Text style={styles.labelText}>
                                Modifying Factors(what makes the pain worse):
                              </Text>
                              <Text style={styles.detailText}>
                                {complaint.modifyingFactorsWorse}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.gridContainer}>
                            <View style={styles.gridItemStart}>
                              <Text style={styles.labelText}>
                                Associated Symptoms:
                              </Text>
                              <Text style={styles.detailText}>
                                {complaint.associatedSymptoms}
                              </Text>
                            </View>
                            <View style={styles.gridItemEnd}>
                              <Text style={styles.labelText}>Context:</Text>
                              <Text style={styles.detailText}>
                                {complaint.context}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.gridContainer}>
                            <View style={styles.gridItemStart}>
                              <Text style={styles.labelText}>
                                Recipient Email
                              </Text>
                              <Text style={styles.detailText}>
                                {complaint.recipientEmail}
                              </Text>
                            </View>
                          </View>
                          <View className="flex-row justify-between space-x-2">
                            <MaterialIcons
                              name="delete-forever"
                              className="cursor-pointer"
                              size={27}
                              color={Colors.red}
                              onPress={() => handleDelete(complaint._id)}
                            />
                            <MaterialIcons
                              name="edit"
                              size={27}
                              color={Colors.primary}
                              className="cursor-pointer"
                              onPress={() => handleEdit(complaint._id)}
                            />
                          </View>
                        </View>
                      </Collapsible>
                    </View>
                  ))}
                <View style={{ marginBottom: 200 }} />
              </ScrollView>
            )}
          </>
        ) : !isLoading && isSuccess && complaint?.length === 0 ? (
          <>
            <View className="flex flex-1 flex-row items-center justify-center">
              <Image
                alt="welcome image"
                source={require("../../assets/images/addFile.png")}
                style={{
                  resizeMode: "contain",
                  width: width,
                  height:
                    Platform.OS === "ios" ? height * 0.35 : height * 0.323,
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("New Complaint")}
              style={{ marginBottom: 10, marginTop: 10, marginHorizontal: 20 }}>
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
                  Add a New Complaint
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : !isLoading && error ? (
          <>
            <View className="flex flex-1 flex-row items-center justify-center">
              <Image
                alt="welcome image"
                source={require("../../assets/images/refresh.png")}
                style={{
                  resizeMode: "contain",
                  width: width,
                  height:
                    Platform.OS === "ios" ? height * 0.35 : height * 0.323,
                }}
              />
            </View>
            <TouchableOpacity
              onPress={refresh}
              style={{ marginBottom: 10, marginTop: 10, marginHorizontal: 20 }}>
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
                  Refresh
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          ""
        )}
      </View>
    </>
  );
};

const styles = {
  accordionContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#478AFB",
    borderRadius: 8,
  },
  accordionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  accordionContent: {
    paddingVertical: 12,
    paddingVertical: 12,
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  gridItemStart: {
    flex: 1,
    marginRight: 8,
  },
  gridItemEnd: {
    flex: 1,
    marginLeft: 8,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,

    color: Colors.black,
  },
  detailText: {
    fontSize: 16,
    fontFamily: "sen",
    color: Colors.gray2,
  },
};

export default PreviousComplaintsScreen;
