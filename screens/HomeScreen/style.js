import { StyleSheet } from "react-native";
import { rMS } from "../../styles/responsiveness";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: rMS(20),
    paddingHorizontal: rMS(20),
    position: "relative",
  },
  box: {
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: rMS(5),
    paddingVertical: rMS(20),
    width: "32%",
  },
  image: {
    borderRadius: rMS(10),
    marginBottom: rMS(10),
    resizeMode: "contain",
  },
  text: {
    fontSize: rMS(11),
    fontFamily: "sen",
    position: "absolute",
    bottom: rMS(2),
    marginBottom: rMS(5),
    padding: rMS(5),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: rMS(20),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
