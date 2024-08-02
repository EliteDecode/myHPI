import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const rS = (size) => {
  return scale(size);
};

export const rVS = (size) => {
  return verticalScale(size);
};

export const rMS = (size) => {
  return moderateScale(size);
};
