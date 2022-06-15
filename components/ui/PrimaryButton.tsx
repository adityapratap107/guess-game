import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';

const PrimaryButton = ({
  children,
  onPressButton,
}: {
  children: any;
  onPressButton: any;
}) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({pressed}) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPressButton}
        android_ripple={{color: Colors.primary600}}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden', // to make sure that ripple effect not move outside container
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    // textAlign: 'center',
    padding: 8,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
