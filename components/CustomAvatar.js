import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../helpers/Colors';

const CustomAvatar = ({ 
  size = 40, 
  rounded = true, 
  title = '', 
  containerStyle = {}, 
  onPress,
  source 
}) => {
  const avatarSize = size;
  const borderRadius = rounded ? avatarSize / 2 : 8;

  if (source) {
    // If image source is provided, you can add Image component here
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        style={[
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: borderRadius,
            backgroundColor: Colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          },
          containerStyle
        ]}
      >
        {/* Add Image component here when needed */}
        <Text style={{ 
          color: 'white', 
          fontSize: avatarSize * 0.4, 
          fontWeight: 'bold' 
        }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: borderRadius,
          backgroundColor: Colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        containerStyle
      ]}
    >
      <Text style={{ 
        color: 'white', 
        fontSize: avatarSize * 0.4, 
        fontWeight: 'bold' 
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomAvatar; 