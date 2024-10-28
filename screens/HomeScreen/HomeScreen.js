import { FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";
import React from "react";
import {
  Button,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CopilotStep, walkthroughable } from "react-native-copilot";
import NavigationBar from "../../components/NavigationBar";
import Colors from "../../helpers/Colors";
import MyStatusBar from "../../helpers/MyStatusBar";
import useHomeOperations from "../../hooks/useHomeOperations";
import { rMS, rS, rVS } from "../../styles/responsiveness";
import { styles } from "./style";
import useIntakeFormOperations from "../../hooks/useIntakeFormOperations";
const { compile } = require("html-to-text");
const { width, height } = Dimensions.get("window");
const CopilotText = walkthroughable(Text);
const CopilotView = walkthroughable(View);

const HomeScreen = ({ route }) => {
  const {
    handleAddComplaint,
    handleAddMedicalHistory,
    modalVisible,
    closeModal,
    handleShareHistoryPress,
    handleAskKeMiPress,
    openControlPanel,
    user,
  } = useHomeOperations({ route });

  const { loading } = useIntakeFormOperations({ route });

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
            <Text className="my-2">Start your tour guide </Text>
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
                height: rVS(height * 0.3),
              }}
            />
          </View>
          <View>
            <View className=" mt-1 rounded-full flex flex-col items-center justify-center">
              <CopilotStep order={2} text="Add new complaints" name="form">
                <CopilotView className="">
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={loading ? () => {} : handleAddComplaint}
                    className="px-3 py-4 m-2 rounded-lg shadow-lg flex flex-row space-x-4 items-center justify-center mt-2"
                    style={{
                      backgroundColor: loading ? "#ccc" : Colors.primary,
                      width: rS(width * 0.75),
                    }}>
                    <Text
                      className="text-white font-bold"
                      style={{ fontSize: rMS(18) }}>
                      {" "}
                      Add new complaint
                    </Text>

                    {loading ? (
                      <FontAwesome
                        name="spinner"
                        size={20}
                        color={Colors.white}
                      />
                    ) : (
                      <FontAwesome name="plus" size={20} color={Colors.white} />
                    )}
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
                  text="You can ask your assitstant KEMI"
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
                  <CopilotText style={styles.text}>
                    Medical History{" "}
                  </CopilotText>
                </CopilotStep>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
