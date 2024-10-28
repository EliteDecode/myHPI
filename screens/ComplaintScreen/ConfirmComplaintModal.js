import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";
import { generatePlainHtmlContent } from "../../utils/htmlcontent";
const { width, height } = Dimensions.get("window");
const { compile } = require("html-to-text");

const ConfirmComplaintModal = ({
  modalVisible,
  setModalVisible,
  complaints,
  saveComplaint,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { form } = useSelector((state) => state.form);

  const data = generatePlainHtmlContent(user.data, form, complaints);

  const options = {
    wordwrap: 130,
  };
  const compiledConvert = compile(options);

  const texts = data.map(compiledConvert);

  const copytoclipboard = async () => {
    const copy = await Clipboard.setStringAsync(texts.join("\n"));

    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Do you wish to continue by sending this complaint to
              gospyjo@gmail.com or copy data to clipboard?
            </Text>
            <View
              className="space-x-4 flex-row mb-5"
              style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={saveComplaint}>
                <Text style={styles.textStyle}>Send Complaint</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={copytoclipboard}>
                <Text style={styles.textStyle}>Copy to Clipboard</Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: 10,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    width: width * 0.95,

    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ConfirmComplaintModal;
