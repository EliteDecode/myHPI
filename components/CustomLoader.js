import React from 'react';
import { View, Text, ActivityIndicator, Modal } from 'react-native';
import Colors from '../helpers/Colors';

const CustomLoader = ({ 
  visible = false, 
  text = "Loading...", 
  overlayColor = "rgba(255,255,255,0.75)",
  children 
}) => {
  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View 
        style={{
          flex: 1,
          backgroundColor: overlayColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <ActivityIndicator 
            size="large" 
            color={Colors.primary} 
            style={{ marginBottom: 10 }}
          />
          {children ? (
            children
          ) : (
            <Text style={{ 
              color: Colors.primary, 
              fontSize: 16, 
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {text}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader; 