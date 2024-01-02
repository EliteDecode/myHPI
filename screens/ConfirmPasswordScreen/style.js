import { Dimensions, Platform, StyleSheet } from "react-native";
import Colors from "../../helpers/Colors";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    paddingVertical: Platform.OS === "ios" ? 80 : 30,
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },

  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 24,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    textAlign: "center",
    borderRadius: 10,
  },
  focusCell: {
    borderColor: "#000",
  },
});

export default styles;
