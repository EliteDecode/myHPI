import { SafeAreaView, View, StatusBar, StyleSheet } from "react-native";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[{ backgroundColor }]}>
    <View>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  </View>
);

export default MyStatusBar;
