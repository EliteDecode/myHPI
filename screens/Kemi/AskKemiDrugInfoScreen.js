import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Button,
  Platform,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import MyStatusBar from "../../helpers/MyStatusBar";
import NavigationBar from "../../components/NavigationBar";
import Colors from "../../helpers/Colors";
import AnimatedLoader from "react-native-animated-loader";
import BackButton from "../../components/BackButton";

const AskKemiDrugInfoScreen = ({ route }) => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 151;
  const navigation = useNavigation();
  const textInputRef = useRef(null);
  const { openControlPanel } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef();
  const { user } = useSelector((state) => state.auth);
  const handleChange = (value) => {
    setMessage(value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const msg = message.replace(/ /g, "%20");

    try {
      setLoading(true);
      const response = await axios.get(
        `https://connect.medlineplus.gov/service?mainSearchCriteria.v.cs=2.16.840.1.113883.6.69&mainSearchCriteria.v.dn=${msg}&informationRecipient.languageCode.c=en&knowledgeResponseType=application/json`
      );

      if (response) {
        setInitial(false);
        const newMessage = {
          text: message,
          time: new Date().toLocaleTimeString(),
          data: response.data,
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        await AsyncStorage.setItem(
          `keMiDrugInfo_${user?.data?._id}`,
          JSON.stringify(updatedMessages)
        );

        setMessage("");
        textInputRef.current.focus();
        scrollViewRef.current.scrollToEnd({ animated: true });

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error making request:", error);
    }
  };

  const getAllMessages = async () => {
    const storedMessages = await AsyncStorage.getItem(
      `keMiDrugInfo_${user?.data?._id}`
    );
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  };

  useEffect(() => {
    getAllMessages();
  }, [route?.params]);

  return (
    <>
      <MyStatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
      <NavigationBar openControlPanel={openControlPanel} />
      <BackButton
        color={Colors.primary}
        content="Drug Info Request"
        font="bold"
      />
      <View className="flex-1 bg-[#fafafa]">
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          behavior={Platform.OS === "ios" ? "height" : "height"}
          style={{ flex: 1 }}>
          <ScrollView
            ref={scrollViewRef}
            className={`${Platform.OS === "ios" ? "mb-3" : "mb-1"} flex-1`}
            onContentSizeChange={() => {
              // Call scrollToEnd when the content size changes
              scrollViewRef.current.scrollToEnd({ animated: true });
            }}
            onLayout={() => {
              // Call scrollToEnd when the layout is calculated
              scrollViewRef.current.scrollToEnd({ animated: true });
            }}>
            <View className="py-5">
              <View>
                <>
                  {messages?.map((message, index) => {
                    return (
                      <View key={index}>
                        <View className="flex-row-reverse mt-2 relative px-5 mb-4">
                          <View className="w-9/12 py-4 px-2  shadow-lg bg-[#1C44A6] rounded-l-xl rounded-b-xl">
                            <Text className="text-[#fff]  mb-2  text-[14px] font-normal">
                              {message.text}
                            </Text>
                            <Text className=" absolute bottom-2 text-[10px] right-3 text-[#fff]">
                              {message.time}
                            </Text>
                          </View>
                        </View>
                        {message?.data?.feed?.entry?.length === 0 &&
                        initial === true ? (
                          <View className="w-[70%] flex p-4">
                            <TouchableOpacity
                              className="rounded-t-xl rounded-r-xl"
                              onPress={() => {}}
                              style={styles.tagContainer}>
                              {/* <Text style={styles.tagText}>{codes?.code}</Text> */}
                              <Text style={styles.tagText} className="">
                                Hi, {user?.data?.Firstname} how can I help you
                                today? Please enter an exact drug name
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : message?.data?.feed?.entry?.length === 0 &&
                          initial === false ? (
                          <View className="w-[70%] flex p-4">
                            <TouchableOpacity
                              className="rounded-t-xl rounded-r-xl"
                              onPress={() => {}}
                              style={styles.tagContainer}>
                              {/* <Text style={styles.tagText}>{codes?.code}</Text> */}
                              <Text style={styles.tagText} className="">
                                Hi, {user?.data?.Firstname} we could'nt get your
                                request, please try researching with an actual
                                drug name
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View className="w-[70%]  flex p-4">
                            <TouchableOpacity
                              className="rounded-t-xl rounded-r-xl"
                              onPress={() => {}}
                              style={styles.tagContainer2}>
                              <View className="w-[100%] flex">
                                <TouchableOpacity
                                  className="rounded-t-xl rounded-r-xl"
                                  onPress={() => {}}
                                  style={styles.tagContainer2}>
                                  <Text
                                    style={styles.tagText}
                                    className="font-bold text-white">
                                    Here's your result for{" "}
                                    {
                                      message?.data?.feed?.entry?.[0]?.title
                                        ?._value
                                    }{" "}
                                    :
                                  </Text>
                                  <TouchableOpacity className=" my-2 border-white shadow-lg rounded-xl p-3 bg-white">
                                    {/* <Text style={styles.tagText}>{codes?.code}</Text> */}
                                    <Text style={styles.tagText}>
                                      <Text>
                                        {message?.data?.feed?.entry?.[0]?.summary?._value
                                          ?.replace(
                                            /<\/?p( class="NLMattribution")?>|<\/?a.*?>|<\/?li>|<\/li>|<\/?ul>|<\/ul>/g,
                                            ""
                                          )
                                          .replace(/<\/li>/g, ",")}
                                      </Text>
                                    </Text>
                                    <Text className="text-[10px] font-bold mt-5">
                                      Source: MedlinePlus.gov
                                    </Text>
                                  </TouchableOpacity>
                                </TouchableOpacity>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </>
              </View>

              {loading && (
                <View className="flex items-center justify-center  flex-1 absolute h-[80vh] w-full">
                  <ActivityIndicator size="large" color={Colors.primary} />
                </View>
              )}
            </View>
          </ScrollView>
          <View className={`px-4   bottom-2`}>
            <View
              className="px-3 shadow-lg rounded-md flex-row justify-between items-center w-full space-x-1"
              style={{ backgroundColor: Colors.primary }}>
              <TextInput
                variant="standard"
                inputStyle={{ fontSize: 17 }}
                ref={textInputRef}
                placeholder="Type Something..."
                placeholderTextColor="#fff"
                color="#fff"
                onFocus={() =>
                  scrollViewRef.current.scrollToEnd({ animated: true })
                }
                onChangeText={handleChange}
                onKeyPress={(e) => (e.Key === "Enter" ? sendMessage(e) : null)}
                style={{ width: "75%", height: 55 }}
                value={message}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.white,
                  padding: 10,
                  borderRadius: 5,
                  width: "25%",
                }}
                onPress={sendMessage}>
                <Text
                  style={{
                    color: Colors.primary,
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "bold",
                  }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  lottie: {
    width: 100,
    height: 100,
  },
  tagContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
  },
  tagContainer2: {
    padding: 5,

    backgroundColor: Colors.gray3,
  },
  tagText: {
    fontSize: 15,
    marginRight: 5,
    lineHeight: 22,
    fontFamily: "sen",
  },
});

export default AskKemiDrugInfoScreen;
